import React, { useCallback, useEffect } from "react";
import { useForm ,useWatch} from "react-hook-form";
import { Button, Input, Select, RTE } from "./index";
import service from "../appwrite/mainconfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue,reset, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);


  useEffect(() => {

    reset({

      title: post?.title || "",

      slug: post?.$id || "",

      content: post?.content || "",

      status: post?.status || "active",

    });

  }, [post, reset]);



  const submit = async (data) => {
    try {
      let fileId;
      if (data.image[0]) {
        const file = await service.uploadfile(data.image[0]);
        fileId = file.$id;
        if (post && post.image) {
          await service.deleteFile(post.image);
        }
      }

      if (post) {
        const dbPost = await service.updatepost(post.$id, {
          ...data,
          image: fileId || post.image,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const dbPost = await service.createPost({
          ...data,
          image: fileId,
          userid: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.image && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.image)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
