import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import css from '../components/css/Nav.css'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [birthday, setBirthday] = useState('')
  const [image, setImage]=useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userUpdate = useSelector((state) => state.userUpdate)
  const [uploading, setUploading] = useState(false)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setLastname(user.lastname)
        setAddress(user.address)
        setPhone(user.phone)
        setBirthday(user.birthday)
        setImage(user.image)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, lastname, email, address, phone, birthday, image, isAdmin }))
  }
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
    <div className="editscreen">
      <Link to='/admin/userlist' className='btn btn-light my-3 back-btn'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User Information</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
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

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
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

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Select as Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="success" className="signin-btn" block>
            Update
          </Button>
          </Form>
        )}
      </FormContainer>
      <br/>
      <br/>
    </div>
  )
}

export default UserEditScreen
