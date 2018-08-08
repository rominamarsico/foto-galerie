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
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = firebase.database().ref('messages').orderByKey();
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent from reloading the page
    /* Send the message to Firebase */
    firebase.database().ref('messages').push( this.state.avatarURL );
  }

  render() {
    var styleGalery = {
      padding: "20px",
      width:"30%",
    };

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

        <br /> <br />

        <form onSubmit={this.addMessage.bind(this)}>
          <input
            type="submit"
            value="Jetzt hinzufügen"
          />
        </form>

        <br />

        {this.state.avatarURL && <img src={this.state.avatarURL} alt="avatar" style={styleGalery} />}

        <br />

        <div>
          { /* Render all images */
            this.state.messages.map( message => <img key={message.id} src={message.text} alt={message.id} style={styleGalery} /> )
          }
        </div>
      </div>
    );
  }
}

export default Home;
