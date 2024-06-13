import conf from '../config/conf'
import { Client, Account, ID, Databases, Storage, Query } from "appwrite"


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, image, status, userId }) {

        try {

            return await this.databases.createDocument(
                conf.appwritedatabaseId,
                conf.appwritecollectiontId,
                slug, {
                title,
                slug,
                content,
                image,
                status,
                userId,

            }
            )
        } catch (error) {
            console.log("Appwrite serive :: create[post] :: error", error);

        }


    }



    async updatepost(slug, { title, content, image, status, userId }) {

        try {

            return await this.databases.updateDocument(conf.appwritedatabaseId,
                conf.appwritecollectiontId,
                slug,
                {
                    title,
                    content,
                    image, status

                }
            )

        } catch (error) {
            console.log("Appwrite serive :: updatepost :: error", error);

        }


    }

    async deletepost(slug) {
        try {

            await this.databases.deleteDocument(conf.appwritedatabaseId, conf.appwritecollectiontId, slug)
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletepost :: error", error);
            return false
        }

    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwritedatabaseId, conf.appwritecollectiontId, slug)

        } catch (error) {
            console.log("Appwrite serive :: getpost :: error", error);
            return false
        }
    }


    async getPostsmany(Queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwritedatabaseId, conf.appwritecollectiontId, Queries)

        } catch (error) {
            console.log("Appwrite serive :: getPostsmany :: error", error);
            return false
        }
    }

    //file uplode service
    async uploadfile(file) {
        try {
            return await this.bucket.createFile(conf.appwritebucketId, ID.unique(), file)
        } catch (error) {
            console.log("Appwrite serive :: uploadfile :: error", error);
            return false

        }
    }


    async deleteFile(fileID) {
        try {
            await this.bucket.deleteFile(conf.appwritebucketId, fileID)


            return true
        } catch (error) {
            console.log("Appwrite serive :: deletefile :: error", error);
            return false

        }
    }


    async previewfile(fileID) {


        return this.bucket.getFilePreview(conf.appwritebucketId, fileID)
    }




}


const service = new Service()

export default service