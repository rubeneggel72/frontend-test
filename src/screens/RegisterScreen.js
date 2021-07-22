import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { Form, Button, Row, Col,Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import anytime from "../image/anytime.jpg";
import offer from "../image/offer3.png";
import logo from "../image/welcome.png";


const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    if (password !== password) {
      setMessage("Passwords do not match");
    } else {console.log(name, lastname, email, address, phone, birthday, image, password,confirmPassword)
      dispatch(register(name, lastname, email, address, phone, birthday, image, password,confirmPassword));
    }
  };  

  const uploadFileHandler = async (e) => {
    console.log("UPLOAD")
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <Row>
      <Col md={4}>
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={anytime}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Any time, Any where</h3>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={offer}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Grab offers</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          width= "100px"
          height="50px"
          src={logo}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Most welcome to our store</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      
      </Col>
      <Col md={8}>
        <FormContainer>
          <h1>Sign Up</h1>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label><i className="fas fa-user"></i> Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="lastname">
              <Form.Label><i className="fas fa-user"></i> Last name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label><i className="fas fa-envelope-square"></i> Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='phone'
                placeholder='Enter phone number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='birthday'>
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type='date'
                placeholder='Enter Birthday'
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label><i className="fas fa-unlock-alt"></i> Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label><i className="fas fa-check-circle"></i> Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="success" className="signin-btn" block>
            Sign Up
          </Button>
          </Form>

          <Row className="py-3">
            <Col>
            Already have an account? {" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              <h7 style={{color:"blue"}}>Sign In Now!</h7>
              </Link>
            </Col>
          </Row>
        </FormContainer>
      </Col>
    </Row>
  );
};

export default RegisterScreen;
