
export const calculateTimeAgo = (timestamp) => {
    const currentTime = new Date()
    const previousTime = new Date(timestamp)
    const timeDifference = currentTime - previousTime
  
    const seconds = Math.floor(timeDifference / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
  
    if (seconds < 60) {
      return `${seconds} seconds ago`
    } else if (minutes < 60) {
      return `${minutes} minutes ago`
    } else if (hours < 24) {
      return `${hours} hours ago`
    } else {
      return `${days} days ago`
    }
  }



  export const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };