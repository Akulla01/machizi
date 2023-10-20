
class Video {
	
		downloadVideo(url){
				const videoUrl = url;
				const anchor = document.createElement('a');
				anchor.download = videoUrl;
				anchor.click();
		}
}

export default Video;