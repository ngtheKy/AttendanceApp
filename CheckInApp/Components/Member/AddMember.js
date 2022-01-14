import React, {useState, useEffect, useRef} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {Input, Icon, Header, CheckBox} from 'react-native-elements';
import {
  Button,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import RNFetchBlob from 'rn-fetch-blob';

export default function AddMember({navigation}) {
  const [imageUri, setimageUriGallery] = useState(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8AAAABAQH7+/v+/v78/Pz9/f2RkZHo6Oj4+Pjx8fGYmJjR0dFSUlLk5OSNjY2wsLATExNAQEBeXl59fX22trYxMTHu7u5vb2/Y2NihoaHCwsI8PDy+vr7f3983Nzeqqqpra2tNTU0bGxt7e3vLy8saGhqFhYUnJydiYmIpKSlISEgCzgqBAAATXklEQVR4nN1dCXfjqg6GeIuTJmmWNts0bbqlvfP//9/zxi5A2CTtPM65t4wjgz5JIBCyTTLSlCzJ20qSpM3fNEnaC3mik2QdCYbWIEkZSWRaB5tDABIfbRym8yGyDb+zVy+RtRJAmw4BSHy0AEC8tiNpMEH2EofpHzDRhuRXTjLDAGYawJuNwVuZqEp7M6ZvN8lobP7GMZgCGuzP5m8eg4PchOYQf9MYhDQ4wJvdnOlhkwy6a0GLBfijbmLQivKKAH/cTRAm2ysxPWwtGmElw2n/mTF4RYD/3lJNob3dGOxI8szbXFSA5EYmStIsS8q6TKr/+NWeTAexGdBLOMC6lOPT8XDZrVdfVJSv1Xp3ORxPY0E4zNFHARjeS373tFg/U1d5Xm+e9qkMMM5STdBeBWDzy8dhtuxgjEYjVqFapSnL1+kHs9s4SzWJFst0gB9MST5++ZYASAAdSNeHeRrdRBva2BpM98UfDYYOx1ZZLfZdazFDR5EBjjt4KMUZJJT+mc4HAARpo5rocSaZZh+k9f9nT1UPEZfB8QBup8rYsyP1q3I6jgeQ2O4MM1FCThuEejwV6e/7Cdc1gs0IALOczM+DFafTfs9ZhOUqAENMNCfjcyD3KGHUGD1dY9j0isYLkGw3XrMLMVH5wmY7fEXpu9NrouSwjKI4mHZ0cMyFWDaHafDjP7zZhZgorzx+2LrGjqRBY7Dc0d7qwdFWZTcZBJAMMdGnTyvAgWNQqSwfBrE54E6uwLhuAqicS9JfD9q/8CZ6JwwpspuAdh77vmz2B1hgDDGiKos4ANG6L9c4gF4S/Hhdl6SPiSb9AJ4+HaxFHoOc5HNPAtlkSg7X/UN07jG0lD6EsclowzU4jWN2YbTN36nK5rUAbm6pOI1kUzETujkONdF0PXTqHySMNfOM+MBDIMDk9XrcI2gpfU0CAZIwE01W+EHjqyBIINpVEmKicQFebwwqtBXEkEOwMBPFAgyeQYJoV6U/vCFkoGnQeWf6s2NQDMZXvAY7j4+cf6FZ9GaKUyrr6wCE/ODt3IRKsgkIUKGXCM6VzK08Pq9MEcF69ZTbq0HnWvSqSzW40q5RMee02N3Eb1CcVKH0hDJRXnwmWr7djntkc58lSoNIgNU0+hvchEqyxuVKoEwUG7LwksQdr4UZgQOSQVAA947ubqw4pXJHLAAlo8wIwkQTHMAoM0hIc5QmXg2iAJKdy2C8vMZ2E3JzZxxAb2SbUqP/n3MTKu2TH6A/r61kWTHXN7tw2s8y9QYpvMv0qx++DBLczpqKL1LqPAA/rAD5uLp6cSClH0MBpvr5oCLgx0Vx/bJ41JHKPDy6TdSb10YONunVf9nq99rlwQqwqhyIS4O+vLZ8vLQA5CFoRG7p8CdfHixCrivLra9rVyYAsSchjOhzKNMDUrmeHT7zYvgDNfPaJcZ8bjXRUbPPDtRg/1y1jWOipW1SinXt4jy2OTsA1id6PTUIMgLJi9MWxoJIIG1XNjYNOnI5qhvm9jHYIEQAjPPkC1lQA6B0Ye4CSFxi/IaFNmIIgwD2N9FqVbKwmWhTORPZMgIAnhwmWpWF/8m+WBm/9QYVEjJj6tQPIHl3AqwQahzlzImy7FAmApLyX0ySVCMxaGthFDAP7O87sQK05LW1+aKOMVj/LQTtuC7z+XgMV+y/SCQALQfYIrQvV+nYCjCxAwQDpLL0CkHbXB91xaxYLzho60scYBNGcazHm8Ph8LQv3w6hELT0OkUwXfg2JzYNugAeffubAi8MuBUvrdBK4dtaHa0A7eGqGfX0XwhaCtDa4ARsA4XZLaiHdmYFaOS18ccKKNXa0jkqxCzqpe2nZNPj22nHOTIrijNdOJjmCJlD9tL2UyUTf+7x+HWZkkCA6R+DI/3CgkdAiJfWBdBKQjnTmj+EaP+EAtwbQtM5Yh6/His+2h5jUCCsmS7ctPXfEwwwgQEyobk46vxhMxmEco8SRoewYbrwt1vAAMG8tmpWyld+2RccIAnmXicRRXdyLdMej19XVqk37UteFI9tHGlC66ZzTfYeXCZtNdsf9qfTfrqiMonQSoFobmzxfPCS/gWUtNpmIRzyQBOlX/yM5SjTCrMzd8Bm5cXi+eA93trJUfu3EA6ZDvL4bWpFJ9tyJUiE2Xk9vtSKJ68NMjsL94VwyJR6aJ0AZxLACuIjJ+Fmh/D4lE29lrQvbdf5gZkvCr4pE/6wh5ugdKvysBcs8z3ewt/cqA1/4wCSA0YZbAecM4/fz02IfSaTFz8p4Wbn9fhNcwcIoOWU+9W36pYQ1mPFR+tASulEBZiQOxVhzbTX49eVmTWvzQCYiQM1W5tc9s1k4KN1eZ1nQ8ht950/bJkuPO02/1+KuJAKyUxAueMtuJRRcIDES+tobmdy9NjRinFVoCx+nzoBSvkZD7YmDI/fTec93UTz96KYaFNZdSRiXLk8vpiUnwgOYEIuGNnXCJm/6ucm2srZjIIzfyHGFcbjjxphmZCg84a1xhHcZiEcMqUwCVxRL/zHg6mMh3LU0YiJw4h5g2N7DQEk2hisL5fPKGWIhB1jB4xyE4xknmtC5sfOfMEleXx7u5Q+g0ZparBZdiOm/oXYglMfrcvjbzQeOhOqEfI9HsrjN2FTDMAmmo+wNsDje28CbfakcnRkAJnHN2LeVos/AacGhomSNo7oVwZDWI8Vb//O5p5LGSA/dmYIa6a1mLfNII5A8gwAUFmz2QBKHj9Xd8BOgHC7f7Zt9L0uc+lcnQOEPb7Z3AFMnjEP3i64vVDBAVo9/vTg5ohX7ruHfSZTKtFygEiPz9yFDyBf+XrGVcEBQjHvuvKYqAfw1uYqn/H+cHd3v1sqv3CAsMc3L7wDAIEz53TtAzgSHr8dyBbuP5oFIMog1NJdEDOj65Rb+gV8SgE4eFvZm5ArhVjo6qy1lffW5NEADbMTS2bglBtCugIAEgNgnr3hOBKn3LDHH1U95Vn55eDIg1QE1XEen35lCIBZnTCL6p+fcmdmzLuuPLXNfSCbA9YCIqi+QIopMXNLgKFZ4jjiHj+DPf436+VscAQ9IAaFN7oO/KfcvFJmOsDM0GCDEOXxCwYwhTz+aMt6qRfSSnOP5C8mrbpDCJ1yW5FOwFNu/eCtdM3r0tRcdE3AHv9F9PJA1Zv3ItgEAJQuCPtSPb6VKVpqAOG8tpKRewZNwTQIBR9fJcER1f0szJW0xWY6EyWIU24FofZQoXF0OrECVDkqOEDA48sh9iarg//yXzNW/rMKTqINOOXuKqUJkBgA8wlwJyTyQiQCGZYzVc8QXiTWPhoXfGdvV1wATrk9SJUnhXLllFvgzkofQCmvzXLKvcoz9QxhxW/eET3bEB6DDUJkXpuolNYzUulyWsJNGKbET7lNj3+nH5KcuAwm3Y6+fKNGuzrTrBVfXpuolAiAeTvTIBzigkdAdI9/MU6BeFoAS5xO2WMcTo+fNyUr0R6/NE/YTIDNmibE4ye6x/9iz1qLCHSWtC9qPTOAVY9nuF1pZnx+ZOXNQys8vpEzaAIkGfCsIdCmnNem/vRBNID1eL2TpdLMIBMnrzJSHy6HbOG8thXuSTU5r02m3UEAm0zHkRqTucdoJYSErsBUVXNo8lgXwuMnhsf/nOgm2k5IyWeN8A+R1hhQ2hWqawstOyT1AXTt8eULcF4bm0vMjN92ajlIQaeTvSN31zaSdo+v5e0CCSj2oL4iPTCvDRZj2+65IRmnIgw29TBtjEWPki9Q10ACysHehHwBymtjp4Fg/kO7WGJn2o3xrIB2Fa18XTZVeX+v/oN40CrKGanjq2RHH0DN46cSwhc7QLbJuBcA24fgXUzPOIulH2Cdg2mmlgMcnSzy1C4AeW30r81E28prffdIfg/ixTPAZpx2ghivJ5QGm3MLxAwG5LV1zsD+WEH7AMdZmt/KL6q1q1ZmnHbimG0Yd2PglW6QTVXrD7zHl/LauhRIx2MF3RA/ivmNHTTZtDLjwhAIrap8LjOwa5MjwCECbZp5bY82DTJtZ+RvTfo2SYXxvDuZnnFhbE2m9MqagMYD5Gdwd+F0skpeW0Oyd5poQ9vGLy4CYB3GcUxrM76921KAB4WWNesFmIhlvwugmdcGPsymB9UXDemdpO0nlztnc2mWTXwaHLFzfE22UH7G3gZQ8/hSXltVvhIEQEKaqeUxl2j5VwYApmeM6c6bugDyV4CqxgPlZ6RLpQlLm3pe29Frok356G4WjxqPl9aeOoQ17cQNsKJdwl2DjLz6xmBdFvzJvmw7qQoKYJ6kk6ZIyT2krC+U4pFjqesZA9httnTFAbQYgKF5bYinz6xPtQlG7iHuZ7xdp8cfiTWbLltY0h+BeW3BAKH57R7iXuSq+T3+HWg8IMA0szVlevxhDzTLJPeqANsy47QTqhcj+GjrGsqKWoNNAB4/DsBG2y1CDcVfPtlvtV8M+/pGA6wZeYGaADx+LBOtSe7bdo93ctmz5yyTUr0+NaaKFwJ3DUt6LMvTYquFR4OBAFnYptlg8mkwFzNu117390H5HEZd5pYPm8CmlK48JkqVvLbhJtogbNqdIIRBxIEWZ3Nl69rCiHwUYlGl40VUIRrktPetNiYYgLmRIcqCm760L944D8Mj8toijMEWYVMm5te7AIPoEAqA3Rvq0ADz9I8Fl+nxB7uJtsIQbjMEwIwh5GNxZaO1AESEweS8tt4AJW1zhKmFVm3uQbOvqY3WysjYo0HllNvCdIAGK5LOH25RANs3VUoDaGzvGnqhRN34DOXx4wFkCC3hSL25B2DVDdNaGUE9yx1pDDYk92277IXdXeG0mXr9SXXXR3vX9lU/m6RsC91ioKPXae87wU2lUrxwGZRTpZyVuNTIIVsrQDK1AeQeP6KJEu7x1fKX0+orb0XaU5fxWABmLPTj8vjDl2qS/d1ToKMZp9X2+Cot8K4oL8DqBjjOB+S1DXMTmsdXe5xxkoljK7DpBxCO7kOn3DE0mFt3wB3tBOCB/T2ldtk6ANY5dy6PL51yRwCYCCuVDXHGaSfUGng4u97+CDLCzG4uenN4/MFugrB12FIubUczLjgx0xi8zFNn147XjlVKtJioltcWBtCi7Zx9D7ktM4aw40XEvPVlyNn9ekvXd3jzsc1E68rGz3SABtsKmx2q1TdDyH7Z2gCy97XZugY0KG2rLxaA9f+fowNUaBWEFXcsqq+bKPwIgtSce5e+XTpmsAf0C917AGwQsph3TTKxaHC59XXNZAQBbN59aZvBrvzuy7Xw+A3TcIJRGwceALBLBDXGYGcv13x/6SP3+NIpt8nD40CAKX8Y0L6RulZhHt91yt2d07lGhwdgdedOFZpjT2wbr04SD63IxRBvFZdJdh6Ancd3ri/Lz2txj6M1ikzSfD7AN7953234NJh7GwmGFgAo0T7FAKi8k93Lq2O8DqSFftn5TLRGgji1LXmbt1Ic0mbqJ6u8AIXHtztvfq7/Q7ONlXaPWwZ7AWb+11JEM7sg2mk8gL/2GyV+E+22Hf4tUP2dmStx31dwbyVup4YDGJTOeyNVnvBbUdQmlp/1IAAihIGXl432AWOiAQDzNnz6W9xEPcvgAKYhYYiNQ/axl2o+kg0QrLdFS3wnINKd66DZxkYSQ5XfAQD97+Tmd+bJLIoyhotp5gKITPuC9yHJ6vrcI5pbAU9s28+I0AAbkt/zHVKsiWK/SsZFkzifwrb9EtVNhGkQ+VUy6c4uUHtzxfHKKxKgfLAaFK1m7wW50hj00n6nQSbaVILD8ZtrcY8Q3AXjJrSQbIiJdrRTc4ygxtXw8ToNchPOvDbnnWZO2XUVxysPSICyiRL/V8mg5J6T/oKXW3j8t4DdhAypB8A6xNi8hteruF5uwvLLGrkf1I9FfACtC3Px4c6rKo5Xin5ser9K5tD93U3dBDLoBJzy9QVY3Zlh4/3Dx+vOHTb0HGP2031D+/SJG2AIEjstpUtPZNuTzjMAYDXhXP3zj1XZec4mfGz21n1zhdw99uceMQYpffyAu8azOQRgQ3tYouyvlyrp0nvCa3cTlqyoHumUE/bSuehLNXrxntFjIqFDAVZlvoupOE5y9qSREO8k4wAYlkZCyPgcyL1fGN9d8v2gMUhsXyXrkU552jDTiuIm3qtF6NAkq5bWBxDfC9my9P7BJjqabokj2zCUzaEmKtMe+XPuPZdqdZk9BcrWw2YcgJxkzD6k0kuVlK6mY4RWLGzCSVZRTFTEDaofTgX/WgxOg3wMrha2R3uGTBVRxqDWSzp++fbiknOr6rJ+mbNtS4/IijcrKm7WfVM+DjP+EQmnBquVy+uhTm2yPD84dCRdAyCn3T8t1s9UKSP1n8/ryxP8ooAoY9AAGC+lua3UFMn4dDxc3terLwnY12r9fjkcT2P+hMywj8062LTdSbx3htpJ9U8px5mZc9aD6TA2+zIdnBDbXDFxxZGtu+tBvYQANJsb+j1kHJux3EQPgL26Dmdz+FLtpgB7sHmjMRjJRHsN/5v0Et9EiY92OMBe2r71GCTaKfftTDTCTg3L5s8AjPVVeWTX/94YDGTzWku13zDJ9Ab4AxocINt/YwwO0cP/rZvgbPZn+p8w0ZsDvNlSTTR3m15+yE2QzuP3Yhp6Pvq6JtpXtv8DbIBMyOsY5+QAAAAASUVORK5CYII=',
  );
  const [image, setImage] = useState('');

  const openGallery = type => {
    let options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      // console.log('base64 -> ', response.base64);
      // console.log('uri -> ', response.assets[0].uri);
      // console.log('width -> ', response.width);
      setimageUriGallery(response.assets[0].uri);
      setImage(JSON.stringify(response));
      console.log(response);
    });
  };

  const onPress = () => {
    console.log(imageUri);
  };

  const [TenNV, setTenNV] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [TenPhongban, setTenPhongban] = useState('');
  const [Ngaysinh, setNgaysinh] = useState(new Date(1640995200000));
  const [Gioitinh, setGioitinh] = useState(true);
  const [CCCD, setCCCD] = useState('');
  const [Quequan, setQuequan] = useState('');
  const [Sdt, setSdt] = useState('');
  const [idDevice, setidDevice] = useState('');
  const [Diachi, setDiachi] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [name, setName] = useState();

  const [On, setOn] = useState(true);
  const [On1, setOn1] = useState(true);
  const ref_input2 = useRef();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date(1640995200000));
  const [birthDay, setBirthDay] = useState('1-1-2022');

  // const id = nextId('178131000');

  const input = {
    TenNV: `${TenNV}`,
    Email: `${Email}`,
    Password: `${Password}`,
    TenPhongban: `${TenPhongban}`,
    Ngaysinh: `${Ngaysinh}`,
    Gioitinh: `${Gioitinh == true ? 1 : 0}`,
    CCCD: `${CCCD}`,
    Quequan: `${Quequan}`,
    Sdt: `${Sdt}`,
    idDevice: `${idDevice}`,
    // id: `${id}`,
    Diachi: `${Diachi}`,
  };

  const update = ({navigation}) => {
    axios
      .post(`http://192.168.1.14:3000/nhanvien/`, input)
      .then(res => {
        console.log(res.status);
        Alert.alert('Hồ sơ nhân viên', 'Thêm mới thành công!', [
          {
            text: 'Ok',
            onPress: () => navigation.goBack('Hồ sơ nhân viên'),
          },
        ]);
      })
      .catch(error => console.log(error));
  };

  function valTenNV() {
    // setTenNV(value)
    if (TenNV.length < 4) {
      Alert.alert('Lỗi', 'Tên không hợp lệ, nhập tên dài hơn 4 kí tự!');
    }
  }
  function valEmail() {
    // don't remember from where i copied this code, but this works.
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(Email)) {
    } else {
      Alert.alert('Lỗi', 'Email không hợp lệ!');
    }
  }
  function togglePassword() {
    setOn(!On);
    // setPassVisible(!passVisible)
  }
  function togglePassword1() {
    setOn1(!On1);
  }
  function confirmPassword() {
    if (Password !== confirmPass) {
      Alert.alert('Mật khẩu không hợp lệ', 'Xác nhận lại mật khẩu!');
    }
  }
  const validatePass = () => {
    var strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    if (strongRegex.test(Password)) {
    } else {
      Alert.alert(
        'Mật khẩu không hợp lệ',
        'Mật khẩu có ít nhất 8 kí tự và chứa các kí tự chữ thường, chữ in, số, kí tự đặc biệt!',
      );
    }
  };

  const onChange = date => {
    setOpen(false);
    setDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const dateString1 = `${year}-${month}-${day}`;
    const dateString = `${day}-${month}-${year}`;

    setBirthDay(dateString);
    setNgaysinh(dateString1);
    console.log(dateString1);
    console.log(date);
  };

  const gender = () => {
    setGioitinh(!Gioitinh);
    console.log(Gioitinh);
  };

  const valCCCD = () => {
    if (CCCD.length < 9) {
      Alert.alert(
        'Thông tin không hợp lệ',
        'Nhập số CCCD hoặc Chứng minh thư có độ dài 9 - 12 số',
      );
    }
  };

  const valQuequan = () => {
    if (Quequan.length < 4) {
      Alert.alert(
        'Thông tin không hợp lệ',
        'Nhập thông tin quê quán có độ dài > 4 ký tự',
      );
    }
  };

  const valDiachi = () => {
    if (Diachi.length < 4) {
      Alert.alert(
        'Thông tin không hợp lệ',
        'Nhập thông tin địa chỉ có độ dài > 4 ký tự',
      );
    }
  };
  const valSdt = () => {
    if (Sdt.length < 10) {
      Alert.alert(
        'Thông tin không hợp lệ',
        'Nhập số điện thoại có độ dài > 10 ký tự',
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        format="DD-MM-YYYY"
        maximumDate={new Date()}
        onConfirm={date => onChange(date)}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View className="form-input" style={styles.input}>
        <Text style={styles.formHeader}>Thông tin tài khoản</Text>
        <View className="Account-login" style={styles.form}>
          <View style={styles.container}>
            {/* <Text style={styles.header}>Img uploader</Text> */}
            <TouchableOpacity onPress={openGallery} style={styles.image}>
              <Image
                source={{uri: imageUri}}
                style={{width: 120, height: 120, borderRadius: 120 / 2}}
              />
            </TouchableOpacity>
            {/* <Input
              onChangeText={() => setName(name)}
              value={name}
              label={'Name'}
              keyboardType="default"
            /> */}
            <TouchableOpacity
              onPress={() => uploadImage()}
              style={styles.uploadbtn}>
              <Text style={{color: 'white', alignSelf: 'center'}}>Upload</Text>
            </TouchableOpacity>
          </View>
          <Input
            onChangeText={value => setTenNV(value)}
            onEndEditing={() => valTenNV()}
            value={TenNV}
            label={'Họ và tên'}
            //placeholder={item.TenNV}
            keyboardType="default"
            // disabled='true'
            maxLength={255}
            // autoFocus={true}
            autoCapitalize={'words'}
          />
          <Input
            onChangeText={value => setEmail(value)}
            onEndEditing={() => valEmail()}
            value={Email}
            label={'Email'}
            //placeholder={item.Email}
            keyboardType="email-address"
          />
          <Input
            onChangeText={value => setPassword(value)}
            onEndEditing={() => validatePass()}
            value={Password}
            label={'Mật khẩu'}
            //placeholder={item.Password}
            keyboardType="default"
            secureTextEntry={On}
            rightIcon={
              <Icon
                name={On == true ? 'eye' : 'eye-off'}
                type="material-community"
                size={20}
                onPress={() => togglePassword()}
              />
            }
          />
          <Input
            onChangeText={value => setConfirmPass(value)}
            onEndEditing={() => confirmPassword()}
            value={confirmPass}
            label={'Xác nhận mật khẩu'}
            //placeholder={item.Password}
            keyboardType="default"
            secureTextEntry={On1}
            rightIcon={
              <Icon
                name={On1 == true ? 'eye' : 'eye-off'}
                type="material-community"
                size={20}
                onPress={() => togglePassword1()}
              />
            }
            ref={ref_input2}
          />
        </View>
        <Text style={styles.formHeader}>Hồ sơ nhân viên</Text>
        <View className="Mem-profile" style={styles.form}>
          {/* <Input
            // onChangeText={(value) => setid(value)}
            value={id}
            label={'Mã Nhân viên'}
            //placeholder={item.id}
            keyboardType="default"
            editable={false}
          /> */}
          <Text style={styles.label}>Phòng ban, Bộ phận</Text>
          <Picker
            selectedValue={TenPhongban}
            onValueChange={(itemValue, itemIndex) => setTenPhongban(itemValue)}
            mode="dropdown"
            style={{}}>
            <Picker.Item label="Phòng Kỹ thuật" value="Phòng Kỹ thuật" />
            <Picker.Item label="Phòng Hành chính" value="Phòng Hành chính" />
            <Picker.Item label="Phòng Kế toán" value="Phòng Kế toán" />
            <Picker.Item label="Phòng Nhân sự" value="Phòng Nhân sự" />
          </Picker>
          <Text style={styles.label}>Ngày sinh</Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginHorizontal: 17,
              marginVertical: 10,
              // backgroundColor: 'gray',
              alignItems: 'center',
            }}
            onPress={() => setOpen(true)}>
            <Text
              style={{
                fontSize: 17.5,
              }}>
              {JSON.stringify(birthDay).replace(/[""]/g, '')}
            </Text>
            <Icon
              type="material-community"
              name="calendar"
              size={20}
              style={{marginLeft: 40}}
            />
          </TouchableOpacity>

          <Text style={styles.label}>Giới tính</Text>
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              // center
              title="Nam"
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color="green"
                  size={25}
                  iconStyle={{marginRight: 10}}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="grey"
                  size={25}
                  iconStyle={{marginRight: 10}}
                />
              }
              checked={!Gioitinh}
              onPress={() => gender()}
            />
            <CheckBox
              // center
              title={'Nữ'}
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color="green"
                  size={25}
                  iconStyle={{marginRight: 10}}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="grey"
                  size={25}
                  iconStyle={{marginRight: 10}}
                />
              }
              checked={Gioitinh}
              onPress={() => gender()}
            />
          </View>
          <Input
            onChangeText={value => setCCCD(value)}
            onEndEditing={() => valCCCD()}
            value={CCCD}
            label={'Căn cước công dân'}
            //placeholder={item.CCCD}
            keyboardType="number-pad"
            // secureTextEntry={true}
            maxLength={12}
          />

          <Input
            onChangeText={value => setQuequan(value)}
            onEndEditing={() => valQuequan()}
            value={Quequan}
            label={'Quê quán'}
            keyboardType="default"
            //placeholder={item.Quequan}
            // secureTextEntry={true}
            maxLength={255}
            autoCapitalize={'words'}
          />
          <Input
            onChangeText={value => setDiachi(value)}
            onEndEditing={() => valDiachi()}
            value={Diachi}
            label={'Địa chỉ hiện tại'}
            keyboardType="default"
            //placeholder={item.Diachi}
            // secureTextEntry={true}
            maxLength={255}
            autoCapitalize={'words'}
          />
          <Input
            onChangeText={value => setSdt(value)}
            onEndEditing={() => valSdt()}
            value={Sdt}
            label={'Số điện thoại'}
            keyboardType="number-pad"
            //placeholder={item.Sdt}
            // secureTextEntry={true}
            maxLength={12}
          />
          {/* <Input
                        onChangeText={(value) => setidDevice(value)}
                        value={idDevice}
                        // onChange={(value) => setText(value)}
                        label={'Thiết bị đăng ký chấm công'}
                        //placeholder={item.idDevice}
                        keyboardType='default'
                    /> */}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => update({navigation})}
        // onPress={() => console.log(typeof(dummy))}
        style={styles.button}>
        <MaterialCommunityIcons
          name="content-save"
          size={20}
          color="white"
          style={styles.buttonTxt}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
        </MaterialCommunityIcons>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Arial',
  },
  image: {
    height: 122,
    width: 122,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#b3b3b3',
    // alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  input: {
    marginHorizontal: 13,
    backgroundColor: 'white',
  },
  buttonTxt: {
    backgroundColor: '#0796dc',
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
  },
  formHeader: {
    fontSize: 20,
    marginTop: 10,
  },
  form: {
    marginTop: 10,
  },
  buttonTxt: {
    backgroundColor: '#0796dc',
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#949494',
  },
});
