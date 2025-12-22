class apiError {
    constructor(stausCode, message = ""){
        this.stausCode = stausCode,
        this.message = message,
        this.sussess = false
    }
}
export default apiError;