const toggleSnackbar = (snackbarOpen, variant, message) => ({
    type: "TOGGLE_SNACKBAR",
    snackbarOpen,
    variant,
    message
});

const storeActionAccess = (data) => ({
    type: "STORE_ACTION_ACCESS",
    data: data
})

export { toggleSnackbar, storeActionAccess };