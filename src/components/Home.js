import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import './Home.css';

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
    return (
      <div>
        <br />
        <br />
        {this.state.isUploading && <p>Bild laden: {this.state.progress}%</p>}
        <br />
        <label className="button">Foto hinzufügen
          <FileUploader
            hidden
            accept="image/*"
            name="avatar"
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </label>
        <br />
        <br />
        {this.state.avatarURL &&
          <form className="polaroids" onSubmit={this.addMessage.bind(this)}>
            <div className="imgCrop">
              <img className="polaroidImg" src={this.state.avatarURL} alt="avatar" />
            </div>
            <br />
            <input
              className="input"
              type="text"
              placeholder="Bildunterschrift..."
              ref={ el => this.inputHashtag = el }
            />
            <input
              className="button"
              type="submit"
              value="Veröffentlichen"
            />
          </form>
        }
        <br />
        <div>
          { /* Render all images */
            this.state.photoData.map( photodata =>
              <p className="polaroids" key={photodata.id}>
                <div className="imgCrop">
                  <img className="polaroidImg"
                    src={photodata.value.text}
                    alt={photodata.value.hashtag}
                  />
                </div>
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
