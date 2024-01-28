function Reg_Validation(values){
    
    let error = {};
    const email_pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    
    // name validation
    if(values.name === ""){
        error.name = "name should not be empty";
    }else{
        error.name="";
    }

    // role validation
    if(values.role === ""){
        error.role = "role should not be empty";
    }else{
        error.role="";
    }
    // phone validation
    if(values.phone === ""){
        error.phone = "phone should not be empty";
    }else{
        error.phone="";
    }
    // addresh validation
    if(values.addresh === ""){
        error.addresh = "phone should not be empty";
    }else{
        error.addresh="";
    }


    // email validation
    if(values.email === ""){
        error.email = "email should not be empty";
    }else if(!email_pattern.test(values.email)){
        error.email = "Invalid email";
    }else{
        error.email="";
    }

    // password validation
    if(values.password === ""){
        error.password = "Password should not be empty";
    }else if(!password_pattern.test(values.password)){
        error.password = "Invalid Password";
    }else{
        error.password="";
    }

    return error;
}

export default Reg_Validation;