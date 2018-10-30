const toggleSnackbar = (snackbarOpen, variant, message) => ({
    type: "TOGGLE_SNACKBAR",
    snackbarOpen,
    variant,
    message
});

export { toggleSnackbar };