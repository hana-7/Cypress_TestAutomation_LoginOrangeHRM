import halamanLogin from '../../support/loginPage';
import loginData from '../../fixtures/loginData.json';
import loginPage from '../../support/loginPage';

describe ('Tugas 17 - POM', () => {
    it('TC-01 - Login dengan username dan password kosong', () => {
        halamanLogin.bukaHalaman();
        halamanLogin.klikTombolLogin();
    });

    it('TC-02 - Login menggunakan username dan password yang benar', () => {
        halamanLogin.bukaHalaman();
        halamanLogin.inputUsername(loginData.usernameValid);
        halamanLogin.inputPassword(loginData.passwordValid);
        halamanLogin.klikTombolLogin();
    });

    it('TC-03 - Login menggunakan username yang benar dan password yang salah', () => {
        halamanLogin.bukaHalaman();
        halamanLogin.inputUsername(loginData.usernameValid);
        halamanLogin.inputPassword(loginData.passwordInvalid);
        halamanLogin.klikTombolLogin();
    });

    it('TC-04 - Login menggunakan username tidak terdaftar di sistem', () => {
        halamanLogin.bukaHalaman();
        halamanLogin.inputUsername(loginData.usernameInvalid);
        halamanLogin.inputPassword(loginData.passwordValid);
        halamanLogin.klikTombolLogin();
    });

    it('TC-05 - Login dengan username kosong dan password diisi', () => {
        halamanLogin.bukaHalaman();
        halamanLogin.inputPassword(loginData.passwordValid);
        halamanLogin.klikTombolLogin();
    });

    it('TC-06 - Login dengan username diisi dan password kosong', () => {
        halamanLogin.bukaHalaman();
        halamanLogin.inputUsername(loginData.usernameValid);
        halamanLogin.klikTombolLogin();
    });

    it('TC-07 - Login menggunakan username dan password yang salah', () => {
        halamanLogin.bukaHalaman();
        halamanLogin.inputUsername(loginData.usernameInvalid);
        halamanLogin.inputPassword(loginData.passwordInvalid);
        halamanLogin.klikTombolLogin();

        loginPage.pesanInvalidCredentials().should('be.visible').and('contain','Invalid credentials');
    });

    it('TC-08 - Membuka halaman Forgot Password', () => {
        halamanLogin.bukaHalaman();
        halamanLogin.klikForgotPassword();

        cy.url().should('include', '/auth/requestPasswordResetCode');
        halamanLogin.judulResetPassword().should('be.visible');
    });
});