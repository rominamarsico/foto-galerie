import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class Home extends Component {
  // ---- storage ----
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

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
  };

  // ---- database ----
  constructor(props) {
    super(props);
    this.state = { photoData: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to photoData in Firebase Database */
    let photoDataRef = firebase.database().ref('photo-url').orderByKey();
    photoDataRef.on('child_added', snapshot => {
      /* Update React state when photodata is added at Firebase Database */
      let photodata = { value: snapshot.val(), id: snapshot.key };
      this.setState({ photoData: [photodata].concat(this.state.photoData) });
    })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent from reloading the page
    /* Send the photodata to Firebase */
    firebase.database().ref('photo-url').push({text: this.state.avatarURL, hashtag: this.inputHashtag.value});
    this.inputHashtag.value = ''; // <- clear the input
  }

  render() {
    var styleGalery = {
      padding: "1%",
      width: "30%",
    };

    var styleDiv = {
      // display: "inline",
    }

    return (
      <div>
        <h1>Home</h1>
        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        <FileUploader
          accept="image/*"
          name="avatar"
          storageRef={firebase.storage().ref("images")}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
          multiple="false"
        />
        <br />
        <br />
        {this.state.avatarURL &&
          <img src={this.state.avatarURL} alt="avatar" style={styleGalery} />
        }
        <br />
        <form onSubmit={this.addMessage.bind(this)}>
          <input
            type="text"
            placeholder="Hashtags hinzufügen..."
            ref={ el => this.inputHashtag = el }
          />
          <input
            type="submit"
            value="Veröffentlichen"
          />
        </form>
        <br />
        <div>
          { /* Render all images */
            this.state.photoData.map( photodata =>
              <p style={styleDiv} key={photodata.id}>
                <img
                  src={photodata.value.text}
                  alt={photodata.value.hashtag}
                  style={styleGalery}
                />
                <br />
                {photodata.value.hashtag}
              </p>
            )
          }
        </div>
      </div>
    );
  }
}

export default Home;
