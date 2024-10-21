import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button, TextField, Select, MenuItem, IconButton } from "@mui/material";
import Div from "../Div/Div";
import { loadLoggedUser, updateUserProfile } from './action';
import Avatar from '@mui/material/Avatar';
import "./UserProfile.css";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { firebase } from '../../utils'; // Certifique-se de importar o firebase corretamente

const UserProfile = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.appReducer.user);
    const profile = userData;

    const [editMode, setEditMode] = useState(false);
    const [editablePhone, setEditablePhone] = useState('');
    const [editableName, setEditableName] = useState('');
    const [editableEmail, setEditableEmail] = useState('');
    const [editableJobTitle, setEditableJobTitle] = useState('');
    const [editableOrgao, setEditableOrgao] = useState('');
    const [avatar, setAvatar] = useState(''); // State para armazenar o avatar

    const setoresOptions = ["Cras", "Creas", "Família Acolhedora", "Habitação"];

    useEffect(() => {
        if (!userData) {
            dispatch(loadLoggedUser());
        } else {
            setEditableName(profile.name);
            setEditableEmail(profile.email);
            setEditableJobTitle(profile.jobTitle);
            setEditableOrgao(profile.orgao);
            setEditablePhone(profile.phone);
            setAvatar(profile.avatarUrl || ''); // Set avatar URL or default to an empty string
        }
    }, [dispatch, userData, profile]);

    const formatPhoneNumber = (phoneNumber) => {
        phoneNumber = phoneNumber.replace(/\D/g, '');
        if (phoneNumber.length === 11 && /^[1-9]{2}\d{4,5}\d{4}$/.test(phoneNumber)) {
            return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else {
            return '';
        }
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        const updatedProfile = {
            uid: userData.uid,
            name: editableName,
            email: editableEmail,
            jobTitle: editableJobTitle,
            orgao: editableOrgao,
            phone: editablePhone,
            avatarUrl: avatar || '' // Ensure avatarUrl is not undefined
        };
    
        dispatch(updateUserProfile(updatedProfile));
        setEditMode(false);
    
        // Reload the page after 1 second
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    };
    

    const handleCancelClick = () => {
        setEditMode(false);
        setEditableName(profile.name);
        setEditableEmail(profile.email);
        setEditableJobTitle(profile.jobTitle);
        setEditableOrgao(profile.orgao);
        setEditablePhone(profile.phone);
        setAvatar(profile.avatarUrl || ''); // Reset avatar URL or default to an empty string
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const storageRef = firebase.storage.ref();
            const fileRef = storageRef.child(`avatars/${userData.uid}/avatar.jpg`); // Use a fixed filename for the user's avatar
            await fileRef.put(file);
            const url = await fileRef.getDownloadURL();
            setAvatar(url);
    
            // Update user profile with the new avatar URL
            const updatedProfile = {
                ...profile,
                avatarUrl: url
            };
            dispatch(updateUserProfile(updatedProfile));
        }
    };
    

    if (!userData) {
        return <div>Seus dados não foram carregados, por favor entre em contato com o administrador</div>;
    }

    const editorWidth = window.innerWidth < 600 ? "100%" : "80%";
    const editorWidthAvatar = window.innerWidth < 600 ? "120px" : "200px";
    const editorHeightAvatar = window.innerWidth < 600 ? "120px" : "200px";
    const editorHeigth = window.innerWidth < 600 ? "110vh" : "80%";

    return (
        <Div className="user-profile-container" style={{ width: editorWidth, height: editorHeigth }}>
            <Box sx={{ width: '100%', marginTop: 2 }}>
                <Grid container spacing={2} className="profile-grid" alignItems="center">
                    <Grid item xs={12} md={12} className="details-dialog-avatar">
                        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                            <Avatar sx={{ width: editorWidthAvatar, height: editorHeightAvatar, border: '1px solid black' }} alt="pessoa" src={avatar} />
                            {editMode && (
                                <IconButton color="primary" aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                                    <PhotoCamera />
                                </IconButton>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item className="user-profile-item">
                                <Typography variant="body1">
                                    Nome: {!editMode ? profile.name : (
                                        <TextField
                                            value={editableName}
                                            onChange={(e) => setEditableName(e.target.value)}
                                            variant="standard"
                                            InputProps={{
                                                disableUnderline: true,
                                                style: { width: 'auto', height: '25px', padding: 0, marginLeft: '1rem', marginRight: '1rem' }
                                            }}
                                            style={{ backgroundColor: "#F2F2F2", borderRadius: '5px' }}
                                            InputLabelProps={{ style: { display: 'none' } }}
                                        />
                                    )}
                                </Typography>
                            </Grid>
                            <Grid item className="user-profile-item">
                                <Typography variant="body1">
                                    E-mail: {profile.email}
                                </Typography>
                            </Grid>
                            <Grid item className="user-profile-item">
                                <Typography variant="body1">
                                    Data de Nascimento: {profile.dataNascimento}
                                </Typography>
                            </Grid>
                            <Grid item className="user-profile-item">
                                <Typography variant="body1">
                                    CPF: {profile.cpf}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item className="user-profile-item">
                                <Typography variant="body1">
                                    Telefone: {!editMode ? formatPhoneNumber(profile.phone) : (
                                        <TextField
                                            value={editablePhone}
                                            onChange={(e) => setEditablePhone(e.target.value)}
                                            variant="standard"
                                            InputProps={{
                                                disableUnderline: true,
                                                style: { width: 'auto', height: '25px', padding: 0, marginLeft: '1rem' }
                                            }}
                                            style={{ backgroundColor: "#F2F2F2", borderRadius: '5px' }}
                                            InputLabelProps={{ style: { display: 'none' } }}
                                        />
                                    )}
                                </Typography>
                            </Grid>
                            <Grid item className="user-profile-item">
                                <Typography variant="body1">
                                    Cargo: {!editMode ? profile.jobTitle : (
                                        <TextField
                                            value={editableJobTitle}
                                            onChange={(e) => setEditableJobTitle(e.target.value)}
                                            variant="standard"
                                            InputProps={{
                                                disableUnderline: true,
                                                style: { width: 'auto', height: '25px', padding: 0, marginLeft: '1rem', marginRight: '1rem' }
                                            }}
                                            style={{ backgroundColor: "#F2F2F2", borderRadius: '5px' }}
                                            InputLabelProps={{ style: { display: 'none' } }}
                                        />
                                    )}
                                </Typography>
                            </Grid>
                            <Grid item className="user-profile-item">
                                <Typography variant="body1">
                                    Setor: {!editMode ? profile.orgao : (
                                       <Select
                                           fullWidth
                                           value={editableOrgao}
                                           onChange={(e) => setEditableOrgao(e.target.value)}
                                           displayEmpty
                                           variant="standard"
                                           style={{ backgroundColor: "#F2F2F2", borderRadius: '5px', marginLeft: '1rem', width: 'auto', padding: 0, marginRight: '1rem' }}
                                       >
                                           <MenuItem value="" disabled>
                                               <em>Selecione o Setor</em>
                                           </MenuItem>
                                           {setoresOptions.map((option, index) => (
                                               <MenuItem key={index} value={option}>
                                                   {option}
                                               </MenuItem>
                                           ))}
                                       </Select>
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {!editMode ? (
                            <Button variant="contained" onClick={handleEditClick}>Editar</Button>
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                <Button variant="contained" onClick={handleSaveClick}>Salvar</Button>
                                <Button variant="contained" onClick={handleCancelClick}>Cancelar</Button>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Div>
    );
};

export default UserProfile;
