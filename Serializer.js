class Serializer {

    /**
     *
     */
    constructor(types = {}) {
        this.types   = types;
        this.default = null;
    }

    /**
     *
     * @param type
     * @param serializeFunction
     * @param deserializeFunction
     * @returns {Serializer}
     */
    register(type, serializeFunction, deserializeFunction) {

        type = this.resolveType(type);

        if (this.has(type)) {
            throw new Error(`E_TYPE_NAME_COLLISION: The type [${type}] already registered.`);
        }

        this.types[type] = {
            serializeFunction,
            deserializeFunction
        };

        return this;
    }

    /**
     *
     * @param type
     * @returns {string}
     */
    resolveType(type) {
        if (type instanceof Function) {
            return type.name
        }

        return type.toString();
    }

    /**
     *
     * @param defaultStrategy
     */
    useDefault(defaultStrategy) {
        this.default = defaultStrategy;
        return this;
    }

    has(type) {
        type = this.resolveType(type);
        return !!this.types[type];
    }

    getStrategy(type) {
        type = this.resolveType(type);

        if (this.has(type)) {
            return this.types[type]
        }

        if (this.default) {
            return this.types[this.default]
        }

        throw new Error(`E_MODEL_SERIALIZE: Type [${type}] is not registered.`);
    }

    async serialize(model, ...optionalParameters) {
        console.log(model.constructor.name);

        return {
            type: model.constructor.name,
            data: await this.getStrategy(model.constructor.name)
                .serializeFunction(model, ...optionalParameters)
        }

    }

    async deserialize(serializedData) {
        let type = serializedData.type;

        if (!type) {
            throw new Error('E_MODEL_SERIALIZE: Data corrupted.');
        }

        let strategy = this.getStrategy(type);

        return await strategy.deserializeFunction(serializedData.data);
    }
}


module.exports = Serializer;
