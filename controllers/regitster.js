import { users } from "../models/users.js";

document.querySelector(".btn-submit").onclick = () => {
    // lấy dữ liều từ các thẻ input
    let arrInput = document.querySelectorAll('#frm input');
    let us = new users();
    for (let index of arrInput) {
        let { id, value } = index;
        us[id] = value;

    }

    // Kiểm thuộc tính gender= true or false
    let male = arrInput[5].checked;
    if (male === true) {
        us.gender = true;
    } else {
        us.gender = false;
    }
    // Kiểm dử liệu nhập vào
    let email = arrInput[0].value;
    let password = arrInput[1].value;
    let passwordConfirm = arrInput[2].value;
    let name = arrInput[3].value;
    let phone = arrInput[4].value;
    // console.log(email, name);
    if (email == "" || password == "" || passwordConfirm == "" || name == "" || phone == "") {
        alert("Điền đầy đủ các trường dữ liệu !!");
        return;
    }
    if (password != passwordConfirm) {
        alert("Mật khẩu không đúng ! Vui lòng nhập lại.");
        return;
    }
    // kiểm tra email đúng định dạng
    if (!kiemTraEmail(email)) {
        return;
    }
    // kiểm tra số phone
    if (!kiemTraSDT(phone, 10)) {
        return;
    }
    //Gọi api 
    let promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Users/signup',
        method: 'POST',
        data: us,
    });

    //Xử lý thành công 
    promise.then(function (result) {
        // console.log('result', result.data.content);
        alert('Thành công!!!');
    });


    //Xử lý thất bại
    promise.catch(function (error) {
        // console.log('error', error.response.data);
        let commit = error.response.data.message;
        alert(commit);
    })
}
let kiemTraEmail = (value) => {
    let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regexEmail.test(value)) {
        return true;
    }
    alert('không đúng định dạng. Ví dụ: email@gmail.com !');
    return false;
}
let kiemTraSDT = (value, maxLength) => {
    if (value.length != maxLength) {
        alert("Nhập vào đúng số điện thoại! 10 số.");
        return false;
    }
    return true;
}