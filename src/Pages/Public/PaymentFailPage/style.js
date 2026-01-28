const styles = {
  wrap: {
    boxSizing: "border-box",
    py: "30px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "32px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "24px",
    padding: "20px",
    width: { xs: "98%", sm: "80%", md: "50%", lg: "30%" },
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  button: {
    px: "1.5rem",
    py: "0.7rem",
    fontWeight: 700,
    borderRadius: "0.5rem",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    textTransform: "none",
    lineHeight: 1,
  },
};
export default styles;
