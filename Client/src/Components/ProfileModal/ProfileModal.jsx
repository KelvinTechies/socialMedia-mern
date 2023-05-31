import { useDisclosure, useDidUpdate } from '@mantine/hooks';
import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import { uploadImage } from '../../Actions/UploadActions/UploadActions'
import { updateUser } from '../../Actions/userActions';





function ProfileModal({ modalOpened, setModalOpened, data }) {
    const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();
    const { Password, ...other } = data
    const { user } = useSelector((state) => state.AuthReducer.authData)

    const [formData, setFormData] = useState(other)
    const [profileImage, setProfileImage] = useState(null)
    const [coverImage, setcoverImage] = useState(null)
    const dispatch = useDispatch()
    const param = useParams()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            event.target.name === "ProfilePicture" ? setProfileImage(img) : setcoverImage(img)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = formData

        if (profileImage) {
            const data = new FormData()
            const fileName = Date.now() + profileImage.name
            data.append("name", fileName)
            data.append("file", profileImage)
            userData.ProfilePicture = fileName

            try {
                dispatch(uploadImage(data))
            } catch (err) {
                console.log(err);

            }
        }

        if (coverImage) {
            const data = new FormData()
            const fileName = Date.now() + coverImage.name
            data.append("name", fileName)
            data.append("file", coverImage)
            userData.CoverPicture = fileName

            try {
                dispatch(uploadImage(data))
            } catch (err) {
                console.log(err);

            }
        }
        dispatch(updateUser(param.id, userData))
        setModalOpened(false)
    }
    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="Authentication"
                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}
                size='55%'

                opened={modalOpened}

                onClose={() => setModalOpened(false)}

            >
                <form action="" className="infoForm">
                    <h3>Your Info</h3>
                    <div>

                        <input type="text" onChange={handleChange} value={formData.FirstName} className='infoInput' name='FirstName' id="" placeholder='First Name' />
                        <input type="text" onChange={handleChange} value={formData.LastName} className='infoInput' name='LastName' id="" placeholder='Last name' />

                    </div>
                    <div>

                        <input type="text" onChange={handleChange} value={formData.Username} className='infoInput' name='Username' id="" placeholder='Username' />
                        <input type="text" onChange={handleChange} value={formData.worksAt} className='infoInput' name='worksAt' id="" placeholder='Works At' />

                    </div>
                    <div>

                        <input type="text" className='infoInput' onChange={handleChange} value={formData.LivesIn} name='LivesIn' id="" placeholder='Lives In' />
                        <input type="text" className='infoInput' onChange={handleChange} value={formData.Country} name='Country' id="" placeholder='Country' />

                    </div>
                    <div>

                        <input type="text" className='infoInput' onChange={handleChange} value={formData.RelationShip} name='RelationShip' id="" placeholder='Relationship Status' />

                    </div>
                    <div>
                        Profile Image
<input type="file" className='infoInput'  name='ProfilePicture' id="" />
                        Cover Image
<input type="file" className='infoInput' name='CoverPicture' id="" />
                    </div>

                    <button className="button Info_Btn" onClick={handleSubmit}>Update</button>
                </form>
            </Modal>

        </>
    );
}
export default ProfileModal