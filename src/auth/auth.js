const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '421744930631-uc9hi9mhplek4pkbeiv2mb2ut9f944j6.apps.googleusercontent.com';
//const client = new OAuth2Client(CLIENT_ID);


const init = () => {
    window.gapi.load('auth2', function () {
        /* Ready. Make a call to gapi.auth2.init or some other API */
    });
}

let googleUser = init(CLIENT_ID);


export class AuthGoogle {

    constructor() {

        this.url = (window.location.hostname.includes('localhost'))
            ? 'http://localhost:8080/api/auth/google'
            : 'https://server-rest-nodejs-ajhen.herokuapp.com/api/auth/google'
            ;

    }



  


    onSignIn(googleUser) {
       // console.log('google-->', this.googleUser);
        let id_token = googleUser.getAuthResponse().id_token;
        const profile = googleUser.getBasicProfile();

        // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

        const data = { id_token };


        fetch(this.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));


        //console.log(id_token);
    }
    onFailure(error) {
        //console.log(error);
    }




    renderButton() {
        window.gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 260,
            'height': 35,
            'longtitle': true,

            //'theme': 'dark',
            'onsuccess': this.onSignIn,
            'onfailure': this.onFailure
        });
    }


    onInit = async () => {


        this.onSignIn(googleUser);
        this.renderButton();


    }

}