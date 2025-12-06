import { Routes, Route } from "react-router-dom";
import {  CategoryPage, HomePage, ServicePage, ServiceDetailPage, TrackOrderPage, LoginPage, RegisterPage, VerifyEmailPage, OtpVerificationPage, ForgotPasswordPage, ResetPasswordPage, PasswordResetSuccessPage } from "../Pages/Public";
import PublicLayout from "../Layout/PublicLayout";

const PublicRoutes = () => {
    return (
        <PublicLayout>
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage />} />
                    <Route path="/category" element={<CategoryPage />} />
                    <Route path="/service" element={<ServicePage />} />
                    <Route path="/service/:title" element={<ServiceDetailPage />} />
                    <Route path="/track-order" element={<TrackOrderPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/verify-email" element={<VerifyEmailPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/reset-success" element={<PasswordResetSuccessPage />} />
                    {/* <Route path="/sample" element={<Sample />} /> */}
                </Route>
            </Routes>
        </PublicLayout>
    );
};

export default PublicRoutes;
