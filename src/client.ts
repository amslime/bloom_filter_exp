import { MongoClient, Db, Collection } from "mongodb"

export default class Client {
    readonly mongoClient: MongoClient
    private connectPromise: Promise<any> | null = null
    constructor(url: string) {
        this.mongoClient = new MongoClient(url, { useNewUrlParser: true })
    }

    async getDb(db: string) {
        if (!this.mongoClient.isConnected()) {
            if (this.connectPromise === null) {
                this.connectPromise = (async () => {
                    await this.mongoClient.connect()
                    this.connectPromise = null
                })()
            }
            await this.connectPromise
        }
        return this.mongoClient.db(db)
    }

    async close() {
        await this.mongoClient.close()
    }

    isConnected() {
        return this.mongoClient.isConnected()
    }
}
