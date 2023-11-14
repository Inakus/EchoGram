import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { UploadButton } from "@uploadthing/react";
import { useState } from "react";

import type { OurFileRouter } from "~/server/uploadthing";
import { api } from "~/utils/api";

export default function Home() {
  const [image, setImage] = useState<string>();
  const user = useUser();
  const hello = api.post.hello.useQuery();

  console.log(user);
  console.log(hello);

  return (
    <>
      <header>
        <UserButton afterSignOutUrl="/" />
      </header>
      <div>Your pages content can go here.</div>
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          if (!res) {
            return;
          }
          setImage(res[0]?.url);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.log(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
}
