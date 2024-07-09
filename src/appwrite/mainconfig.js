import conf from '../config/conf';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, image, status, userid }) {
        try {
            return await this.databases.createDocument(
                conf.appwritedatabaseId,
                conf.appwritecollectiontId,
                slug, // Change this to use ID.unique() instead of slug
                {
                    title,
                    slug,
                    content,
                    image,
                    status,
                    userid,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return false;
        }
    }


    async updatepost(slug, { title, content, image, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwritedatabaseId,
                conf.appwritecollectiontId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatepost :: error", error);
            return false;
        }
    }

    async deletepost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwritedatabaseId,
                conf.appwritecollectiontId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletepost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            console.log("test"+slug)
            if (!slug) {
                throw new Error("Missing slug parameter");
            }
            console.log("getPost :: slug", slug);
            return await this.databases.getDocument(
                conf.appwritedatabaseId,
                conf.appwritecollectiontId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }
    
    
    async getPostsmany(Queries = [Query.equal("status", "active")]) {
        try {
            console.log("Appwrite service :: getPostsmany :: Queries", Queries); // Log queries
            return await this.databases.listDocuments(
                conf.appwritedatabaseId,
                conf.appwritecollectiontId,
                Queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPostsmany :: error", error);
            return false;
        }
    }
    

    async uploadfile(file) {
        try {
            return await this.bucket.createFile(conf.appwritebucketId, ID.unique(), file);
        } catch (error) {
            console.log("Appwrite service :: uploadfile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwritebucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletefile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwritebucketId, fileId);
    }
}

const service = new Service();

export default service;
