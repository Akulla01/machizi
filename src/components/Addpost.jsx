// Importing necessary modules and components
import React, { useEffect, useState } from 'react';
import Post_handler from '../modules/post_db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Loaderwithmessage from '../loaders/Loaderwithmessage';
import Basic from '../modules/basic';
import { toast } from 'react-toastify';
import Banner from '../../src/adselements/Banner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import upload from '../assets/upload.svg';
import upload2 from '../assets/upload2.svg';
import upload3 from '../assets/upload3.svg';
import '../custom_styles/quill_styler.css';

// Functional component definition
function Addpost() {
  // State variables
  const request = new Post_handler();
  const [step, setStep] = useState(1);
  const basic = new Basic();
  const [counter, setCounter] = useState(0);
  const [current, setCurrent] = useState(upload);
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState({
    sent: false,
    response: null,
  });

  const [Value, setValue] = useState("👋write your post heading here...click me to start writing");
  const [userData, setuserData] = useState({
    post_heading: Value,
    post_tags: '',
    post_sensitive: "false",
    post_media: null,
  });
  const [media, setMedia] = useState({
    url: '',
    type: null,
  });

  // Quill editor modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ 'font': [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'video'],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
    'history': {
      'delay': 2500,
      'userOnly': true,
    },
  };

  // useEffect for background change
  useEffect(() => {
    var change_background = setInterval(() => {
      setCounter((prev) => (prev += 1));
    }, 5000);
    return () => clearInterval(change_background);
  }, []);

  // useEffect to handle background image changes
  useEffect(() => {
    var images = [upload, upload2, upload3];
    if (counter === 3) {
      setCounter(0);
    }
    setCurrent(images[counter]);
  }, [counter]);

  // useEffect to update post heading
  useEffect(() => {
    setuserData((prev) => ({
      ...prev,
      post_heading: Value,
    }));
  }, [Value]);

  // Function to handle media upload
  const handleMediaUpload = (e) => {
    e.preventDefault();
    const selectedMedia = e.target.files[0];
    const mediaUrl = URL.createObjectURL(selectedMedia);
    setMedia((prev) => ({
      ...prev,
      url: '',
      type: null,
    }));
    setuserData((prev) => ({
      ...prev,
      post_media: selectedMedia,
    }));
    if (selectedMedia.type.includes('video')) {
      var size = selectedMedia.size / (1024 * 1024);
      console.log(size);
      if (size > 500) {
        toast.error("your video is too long..it may not upload.");
      }
      setMedia((prev) => ({
        ...prev,
        url: mediaUrl,
        type: 'video',
      }));
    }
    if (selectedMedia.type.includes('image')) {
      setMedia((prev) => ({
        ...prev,
        url: mediaUrl,
        type: 'image',
      }));
    }
    setStep((prev) => (prev += 1));
  };

  // Function to handle upload
  const handleUpload = (e) => {
    e.preventDefault();
    setMessage((prev) => ({
      ...prev,
      sent: true,
    }));

    var formData = new FormData();
    formData.append("post_description", userData.post_heading);
    formData.append("post_media", userData.post_media);
    formData.append("post_tags", userData.post_tags);
    formData.append("post_sensitive", userData.post_sensitive);
    request.post_with_token('create-post', formData, setMessage);
  };

  // JSX structure of the component
  return (
    <div className={`shadow-md rounded bg-light_bg w-full ${message.sent && 'overflow-y-clip overflow-hidden h-0'} min-h-screen flex flex-col sm:flex-row items-center sm:gap-10 sm:justify-center dark:bg-dark_bg dark:text-grey_dark`}>
      <h1 className='text-md font-bold my-4 sm:text-xl'> create your post 🎊 step: {step} of 5</h1>
      <div className='md:w-[400px] w-[200px] h-[250px] md:h-[600px]'>
        <img src={current} className='w-full h-full' alt="upload image" />
      </div>
      {message.sent && message.response == null ? (
        <Loaderwithmessage
          filewarn="files larger than 20 minutes are not supported"
          message="uploading your post....be patient your video should be short in length"
        />
      ) : null}

      <div className='flex flex-col m-4 items-center'>
        {step == 1 && (
          <ReactQuill
            className='h-[200px] sm:w-[400px] rounded'
            theme="snow"
            value={Value}
            onChange={setValue}
            modules={modules}
          />
        )}

        {step == 2 && (
          <>
            <label className='text-xl my-4 font-bold uppercase'>Video tags</label>
            <span className='text-sm text-grey_light my-4 dark:text-grey_dark'>tags help your videos reach a wide audience</span>
            <input
              id="username"
              onChange={(e) => {
                setuserData((prev) => ({
                  ...prev,
                  post_tags: e.target.value.toLowerCase(),
                }));

                var tag_array = e.target.value.split(',');
                setTags(tag_array);
              }}
              type="text"
              value={userData.post_tags}
              className='w-[300px] min-w-[200px] my-4 mx-0 h-[40px] shadow-md outline-none rounded focus:border-4   focus:border-primary   focus:text-grey_light'
              placeholder='eg: maseno,football,class '
            />
            <div className='flex flex-wrap w-[300px] min-h-[50px] bg-light_overlay dark:bg-dark_overlay rounded p-2'>
  {tags?.map((elements) => (
    <span className='min-w-[60px] p-2 h-[40px] rounded-md m-2 bg-light_bg dark:bg-dark_bg items-center flex justify-center'>{elements}</span>
  ))}
</div>

          </>
        )}

        {step == 3 && (
          <>
            <h1 className='m-2'> skip if your post doesn't contain image or video</h1>
            <label htmlFor="media" className='border my-4 border-dashed p-10 rounded cursor-pointer'><FontAwesomeIcon icon={faImage} /> choose a media  file</label>
            <input type="file" className='hidden' onChange={handleMediaUpload} id='media' />
          </>
        )}

        {step == 4 && (
          <div className='my-4 font-bold'>
            <h3 className='my-4 text-sm'>your selected image</h3>
            <div>
              {media.type === 'video' && (
                <video src={media.url} controls className='w-[400px] h-[250px]'></video>
              )}
              {media.type === 'image' && (
                <img src={media.url} className='w-[300px] h-[250px] rounded object-cover' />
              )}
            </div>
            <div className='flex my-4'>
              <input
                type="checkbox"
                value="true"
                onChange={(e) => setuserData((prev) => ({
                  ...prev,
                  post_sensitive: e.target.value,
                }))}
                id="sensitive"
              />
              <label htmlFor="sensitive" className='my-4 text-sm'>&nbsp; post contains disturbing images or videos</label>
            </div>
          </div>
        )}

        {step == 5 && (
          <div>
            <button className='sm:mx-2 text-grey_dark hover:bg-accent w-full my-2 rounded sm:w-[150px] h-[40px] bg-primary' onClick={handleUpload}>upload</button>
            <button className='sm:mx-2 w-full my-2 rounded sm:w-[150px] h-[40px] border hover:border-none hover:bg-primary' onClick={() => setStep((prev) => (prev -= 1))}>
              previous
            </button>
            <button className='text-grey_dark sm:mx-2 hover:bg-accent w-full my-2 rounded sm:w-[150px]  h-[40px] border hover:border-none' onClick={() => basic.home()}>back home</button>
          </div>
        )}

        {step !== 5 && (
          <div className=' my-10  h-[100px] w-full bg-primary rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-5 flex items-center'>
            {step > 1 && (
              <button
                className='w-[100px] h-[40px] border rounded mx-4 hover:border-none hover:bg-primary'
                onClick={() => setStep((prev) => (prev -= 1))}
              >
                previous
              </button>
            )}

            <button
              className='w-[100px] h-[40px] border rounded mx-4 hover:border-none hover:bg-primary'
              onClick={() => setStep((prev) => (prev += 1))}
            >
              next
            </button>
            <button className='w-[100px] h-[40px] border rounded mx-4 hover:border-none hover:bg-primary' onClick={() => basic.home()}>back home</button>
          </div>
        )}

        <br />
        <br />
        {/* <Banner isGlobal={true}/> */}
      </div>
    </div>
  );
}

// Exporting the component
export default Addpost;
