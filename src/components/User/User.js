import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Div } from '../../components';
import DetailsDialogUser from "./Details/DetailsDialogUser";
import { changeVisibleDetailsDialog, loadUsersList } from './action';
import "./User.css";

const User = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.users.userList);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); 

    const formatarTelefone = (telefone) => {
        telefone = telefone.replace(/\D/g, '');
        if (telefone.length === 11 && /^[1-9]{2}\d{4,5}\d{4}$/.test(telefone)) {
            return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else {
            return '';
        }
    };

    const getTextCor = (situation) => {
        if (situation === 'Ativo') {
            return 'green';
        } else if (situation === 'Inativo') {
            return 'red';
        } else {
            return 'black';
        }
    };

    const handleOpen = (data) => {
        dispatch(changeVisibleDetailsDialog(true, data));
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!products) {
            dispatch(loadUsersList());
        }
    }, [dispatch, products]);

    const filteredProducts = products ? products.filter(primary => {
        const fullName = `  ${primary.name}`.toLowerCase();
        if (searchTerm && fullName.indexOf(searchTerm.toLowerCase()) === -1) {
            return false;
        }

        if (filter !== 'all' && primary.accessControl.situation !== filter) {
            return false;
        }

        return true;
    }) : [];

    const isMobile = window.innerWidth <= 600;

    return (
        <Div sx={{ width: '100%', display: "flex", justifyContent: 'center' }}>
            <Grid container direction='column' sx={{ width: '80%' }}>
                <Grid container item sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Grid item xs={12} sm={10} sx={{ pr: 1 }}>
                        <input
                            type="text"
                            placeholder="Buscar por nome"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </Grid>
                    <Grid item xs={6} sm={2} sx={{ pl: 1 }}>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">Todos</option>
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                        </select>
                    </Grid>
                </Grid>
                <Grid container item direction='column' style={{ marginTop: '15px', gap: '10px'}} className="user-list-container">
                    {filteredProducts.map(primary => (
                        <Grid container item key={primary.uid} className="user-list-item" onClick={() => handleOpen(primary)}>
                            <Grid item xs={12} sm={3} className="user-item-list">
                                <Typography className="truncated-text">
                                    {primary.name}
                                </Typography>
                            </Grid>
                            {!isMobile && (
                                <>
                                    <Grid item xs={12} sm={3} className="user-item-list">
                                        <Typography className="truncated-text">
                                            {primary.email}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={1} className="user-item-list">
                                        <Typography>
                                            {primary.orgao}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2} className="user-item-list">
                                        <Typography className="truncated-text">
                                            {primary.jobTitle}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2} className="user-item-list">
                                        <Typography>
                                            {formatarTelefone(primary.phone)}
                                        </Typography>
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12} sm={1} className="user-item-list">
                                <Typography style={{ color: getTextCor(primary.accessControl.situation) }}>
                                    {primary.accessControl.situation}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <DetailsDialogUser
                open={open}
                onClose={handleClose}
            />
        </Div>
    );
};

export default User;
