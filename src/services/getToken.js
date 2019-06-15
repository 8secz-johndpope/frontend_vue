export function getToken() {
    if (localStorage.storedName != "" && localStorage.storedPass != "") {
        var requestBody = {
            login: localStorage.storedName,
            password: localStorage.storedPass
        };
        fetch("http://127.0.0.1:8000/api/auth", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                localStorage.storedJWT = res.data;
                this.$emit("authSuccess");
            })
            .catch(err => {
                console.log(err.message);
                this.failureMessage = err.message;
                this.failure = true;
                this.loading = false;
            });
    }
}
