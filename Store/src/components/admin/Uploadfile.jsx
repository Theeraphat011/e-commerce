import { useState } from "react";
import { toast } from "react-toastify";
import Resize from 'react-image-file-resizer';
import { removeFiles, uploadFiles } from "../../api/product";
import useEcomstore from "../../Store/Store";
import { Loader } from 'lucide-react';

const Uploadfile = ({ form, setForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useEcomstore((state) => state.token)

  const handleOnChange = (e) => {
    const files = e.target.files;

    if (files) {
      setIsLoading(true);
      let allFiles = form.images

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith('image/')) {
          toast.error(`file ${file.name} `);
          continue
        };

        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => (
            uploadFiles(token, data)
              .then((res) => {
                allFiles.push(res)
                // console.log(allFiles)
                setForm({
                  ...form,
                  images: allFiles
                })
                setIsLoading(false)
                toast.success('Upload Image Success...')
              })
              .catch((err) => {
                setIsLoading(false)
                console.log(err)
              })
          ),
          "base64"
        )
      };
    };

  };

  const handleDelete = (public_id) => {
    setIsLoading(true);
    const images = form.images 
    removeFiles(token,public_id)
    .then((res) =>{
      const filterImages = images.filter((item) => {
        // console.log(item)
        return item.public_id !== public_id
      })
    
    setForm({
      ...form,
      images: filterImages
    })
    setIsLoading(false)
  })
    // console.log(public_id)
  }

  return (
    <>

      <div className="flex gap-4">
        {
          isLoading && <Loader className="animate-spin"/>
        }
        {
          form.images.map((item, index) => (
            <div className="relative" key={item.public_id}>
              <img src={item.url} className="w-24 h-24 hover:scale-105" />
              <span
                onClick={() => handleDelete(item.public_id)}
                className="absolute top-0 right-0 bg-red-500 py-1 px-3 rounded-full text-white cursor-pointer"
              >X</span>
            </div>
          ))
        }
      </div>

      <div className="relative">
        <input
          type="file"
          name="images"
          multiple
          onChange={handleOnChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="bg-gray-400 text-white text-center py-2 px-4 cursor-pointer">
          {isLoading ? "Uploading..." : "Upload Images"}
        </div>
      </div>
    </>
  );
};

export default Uploadfile;
