import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { changeVisibleDetailsDialog, editUsersList } from '../action';
import { USERS_CHANGE_USERDATA_CHILD_VALUE } from '../../../constants/actionTypes';
import './DetailsDialogUser.css';

function DetailsDialogUser(props) {
    const dispatch = useDispatch();

    const primary = useSelector(state => state.users.userData);
    const show = useSelector(state => state.users.showDetails);

    const handleClose = () => {
        dispatch(changeVisibleDetailsDialog(false));
    };

    const editUser = () => {
        dispatch(editUsersList(primary));
    };

    const handleChangeValue = (value, key, property) => {
        dispatch({ type: USERS_CHANGE_USERDATA_CHILD_VALUE, key, property, payload: value });
    };

    const formatarTelefone = (telefone) => {
        telefone = telefone.replace(/\D/g, '');
        if (telefone.length === 11 && /^[1-9]{2}\d{4,5}\d{4}$/.test(telefone)) {
            return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else {
            return '';
        }
    };

    return (
        <Dialog onClose={handleClose} open={show} maxWidth='md' className="details-dialog">
            {primary && (
                <Grid container sx={{ p: 2 }} style={{ backgroundColor: "#f5f5f5", borderRadius: 8 }}>
                    <Grid item xs={12} sm={4} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', marginBottom: '15px' }} className="details-dialog-avatar">
                        <Avatar sx={{ width: 120, height: 120, border: '1px solid black' }} alt="User Avatar" src={primary.avatarUrl} />
                    </Grid>
                    <Grid container item xs={12} sm={8} direction="column" key={primary.uid} sx={{ border: 1, borderRadius: 1 }} className="details-dialog-content">
                        <Grid item sx={{ mb: 1 }}>
                            <Typography>Nome: {primary.name}</Typography>
                        </Grid>
                        <Grid item sx={{ mb: 1 }}>
                            <Typography>E-mail: {primary.email}</Typography>
                        </Grid>
                        <Grid item sx={{ mb: 1 }}>
                            <Typography>Telefone: {formatarTelefone(primary.phone)}</Typography>
                        </Grid>
                        <Grid item sx={{ mb: 1 }}>
                            <Typography>Cargo: {primary.jobTitle}</Typography>
                        </Grid>
                    </Grid>
                    <Grid xs={12} item sx={{ borderRadius: 1, m: 1, display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button
                            sx={{ width: '20%', borderRadius: 2 }}
                            variant="contained"
                            disabled={primary.accessControl.situation === 'Ativo'}
                            onClick={() => handleChangeValue('Ativo', 'accessControl', 'situation')}
                        >
                            Ativar
                        </Button>
                        <Button
                            sx={{ width: '20%', borderRadius: 2 }}
                            variant="contained"
                            disabled={primary.accessControl.situation === 'Inativo'}
                            onClick={() => handleChangeValue('Inativo', 'accessControl', 'situation')}
                        >
                            Inativar
                        </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Grid>
                            <Typography variant="h6">Administrador</Typography>
                            <Switch
                                checked={primary.accessControl.adm}
                                onChange={(event) => handleChangeValue(event.target.checked, 'accessControl', 'adm')}
                                disabled={primary.accessControl.situation === 'Inativo'}
                            />
                        </Grid>
                        <Grid>
                            <Typography variant="h6">Editor</Typography>
                            <Switch
                                checked={primary.accessControl.readyOnly}
                                onChange={(event) => handleChangeValue(event.target.checked, 'accessControl', 'readyOnly')}
                                disabled={primary.accessControl.situation === 'Inativo'}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={editUser} variant="contained" sx={{ width: 150, borderRadius: 2 }}>
                            Salvar
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Dialog>
    );
}

DetailsDialogUser.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default DetailsDialogUser;
