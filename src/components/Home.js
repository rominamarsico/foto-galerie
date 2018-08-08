import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class Home extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));

    var urlArray = [];
    urlArray.push(this.state.avatarURL)
    // console.log(urlArray)
    // console.log("Array Länge: " + urlArray.length)
    console.log("BITTEEEE: " + firebase.storage.Reference.bucket)
  };

  render() {

    // firebase.storage().ref("images").child('44be445b-d4c0-4579-b0a3-86ab99b8915a.JPG').getDownloadURL().then(function(url) {
    //   var img = document.getElementById('gallery');
    //   img.src = url;
    // })

    return (
      <div>
        <h1>Home</h1>
        <form>
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChangeUsername}
          />
          <label>Avatar:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          <FileUploader
            accept="image/*"
            name="avatar"
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            multiple="true"
          />
        <br /> <br />
        {this.state.avatarURL && <img src={this.state.avatarURL} alt="avatar" width="30%"/>}
        </form>
        {/*
          <img id="gallery" alt="gallery" width="30%"/>
        */}
      </div>
    );
  }
}

export default Home;
