import React, { Fragment, useState, useEffect } from "react";
import { TodoItem } from "./home/TodoItem";
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';


export function TodoList() {


  let localUser = {};


  const loginIn = () => {

    let url = (window.location.hostname.includes('localhost'))
      ? 'http://localhost:8080/api/auth'
      : 'https://test-tissini-anthony-henriquez.herokuapp.com/api/auth'
      ;

    const
      form = document.querySelector('#form-login'),
      { email, password } = form,
      data = { email: email['value'], password: password['value'] }
      ;



    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {

        let { errors, status, msg, user, token } = data;
        if (errors) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errors[0].msg
          })
        }

        if (status === 400) Swal.fire(msg, '', 'question');

        if (status === 200) {

          const { uid, nombre } = user;

          localUser.token = token;
          localUser.uid = uid;
          localUser.nombre = nombre;

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Welcome ${user.nombre}`.toLocaleLowerCase(),
            showConfirmButton: false,
            timer: 1500,
            width: '500px',
            height: '100px',
          })

          localStorage.setItem('user', JSON.stringify(localUser));
          handleHidenLogin();
        }

        // console.log('Success:', data);

      })
      .catch((error) => console.error('Error:', error));

  }


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('user'));
    if (storedTodos) handleHidenLogin();

  }, []);

  const registerUser = () => {


    let url = (window.location.hostname.includes('localhost'))
      ? 'http://localhost:8080/api/user'
      : 'https://test-tissini-anthony-henriquez.herokuapp.com/api/user'
      ;

    const
      form = document.querySelector('#form-sign-in'),
      { nameRegister, emailRegister, passRegister } = form,
      data = {
        nombre: nameRegister['value'],
        email: emailRegister['value'],
        password: passRegister['value']
      }
      ;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {

        let { errors, status, msg } = data;
        if (errors) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errors[0].msg
          })
        }

        if (status === 500) Swal.fire(msg, '', 'error');
        if (status === 201) {
          Swal.fire(msg, '', 'success')
          handleClose();
        }


      })
      .catch((error) => console.error('Error:', error));



  }


  const [showlogin, setShowLogin] = useState(true);
  const handleHidenLogin = () => setShowLogin(false);
  // const handleShowLogin = () => setShowLogin(true);
  const Login = () => (

    <div className="container-login">
      <div className="body"></div>
      <div className="grad"></div>
      <div className="header">
        <div className="logo-tissini"></div>
      </div>
      <div className="login">
        <form id="form-login">
          <input type="text" placeholder="USERNAME" name="email" />
          <input type="password" placeholder="PASSWORD" name="password" />
          <input onClick={loginIn} type="button" value="Sign In" />

          <div id="my-signin2" className="g-signin2 pt-2" data-onsuccess="onSignIn"></div>

          <Button variant="link" onClick={handleShow}> Sign Up</Button>
        </form>
      </div>
    </div>
  )


  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const ModalLogin = () => (

    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="mx-auto">
        <Modal.Title>
          <div className="logo-tissini-s"></div>
        </Modal.Title>
        <h1 className="text-light">SIGN UP</h1>
      </Modal.Header>
      <Modal.Body>
        <div className="col-6 mx-auto">

          <form id="form-sign-in">

            <div className="mb-3 row">
              <div className="col-sm-10">
                <input type="text" placeholder="NAME" className="modal-input" name='nameRegister' />
              </div>
            </div>

            <div className="mb-3 row">
              <div className="col-sm-10">
                <input type="text" placeholder="EMAIL" className="modal-input" name='emailRegister' />
              </div>
            </div>

            <div className="mb-3 row">
              <div className="col-sm-10">
                <input type="password" placeholder="PASSWORD" className="modal-input" name='passRegister' />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button onClick={registerUser} type="submit" variant="light">
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>

  )




  return (

    <Fragment>
      {showlogin ? <Login /> : <TodoItem />}
      <ModalLogin />
    </Fragment>

  );
}