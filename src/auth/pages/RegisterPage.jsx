
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth/thunks';

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
    password: [(value) => value.length >= 6, 'El password debe tener un minimo de 6 caracteres'],
    displayName: [(value) => value.length >= 1, 'El nombre es requerido'],
}

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector( (state) => state.auth );
    const isCheckingAuthentication = useMemo( () => status === 'checking',[status] )

    const {
        onInputChange,
        displayName,
        email,
        password,
        formState,
        isFormValid,
        displayNameValid,
        emailValid,
        passwordValid
    } = useForm({
        displayName: '',
        email: '',
        password: ''
    }, formValidations);

    const onSubmit = (e) => {
        
        e.preventDefault();
        setFormSubmitted(true);

        if( !isFormValid ) return;
        
        dispatch( startCreatingUserWithEmailAndPassword(formState) )
    }

    return (

        <AuthLayout title="Crear cuenta" >

            <h1>Formulario:  { isFormValid ? 'valido' : 'incorrecto' } </h1>

            <form onSubmit={onSubmit} >
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }} >
                        <TextField
                            label="Nombre completo"
                            type="text"
                            placeholder='Ingrese su nombre...'
                            fullWidth
                            name='displayName'
                            onChange={onInputChange}
                            value={displayName}
                            error={!!displayNameValid && formSubmitted }          /*Si da true tira error */
                            helperText={displayNameValid}      /*Mensaje abajo */
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }} >
                        <TextField
                            label="correo"
                            type="email"
                            placeholder='correo@google.com'
                            fullWidth
                            name='email'
                            onChange={onInputChange}
                            value={email}
                            error={!!emailValid && formSubmitted}          
                            helperText={emailValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }} >
                        <TextField
                            label="contraseña"
                            type="password"
                            placeholder='Ingrese su password'
                            fullWidth
                            name='password'
                            onChange={onInputChange}
                            value={password}
                            error={!!passwordValid && formSubmitted}          
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
                        <Grid item xs={12} display={ !!errorMessage ? '' : 'none' } >
                            <Alert severity="error" >
                                {errorMessage}
                            </Alert>
                        </Grid>
                        <Grid item xs={12} >
                            <Button disabled={ isCheckingAuthentication } type='submit' variant='contained' fullWidth >
                                Crear Cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end" >
                        <Typography sx={{ mr: 1 }} >Ya tienes cuenta?</Typography>
                        <Link component={RouterLink} color="inherit" to="/auth/login" >
                            Ingresar
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>




    )
}
