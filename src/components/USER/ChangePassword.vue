<template>
  <div class="ass1-login">
    <div class="container bootstrap snippets bootdey">
      <div style="height: auto; min-height: 300px" class="jumbotron">
        <div class="col-md-12 form-content">
          <form
            accept-charset="utf-8"
            id="UserLoginForm"
            class="form-signin"
            action="#"
            v-on:submit.prevent="handleSubmitChangePW"
          >
            <h1 class="form-signin-heading text-muted">Đổi mật khẩu</h1>

            <!-- Password Cũ -->
            <div class="password-container">
              <input
                v-model="passwordCu"
                :type="showPasswordCu ? 'text' : 'password'"
                placeholder="Password cũ"
                class="form-control"
                name="passwordCu"
                autofocus="autofocus"
                id="passwordCu"
                required
              />
              <i
                v-if="passwordCu.length > 0"
                class="fa"
                :class="showPasswordCu ? 'fa-eye-slash' : 'fa-eye'"
                @click="togglePassword('cu')"
              ></i>
            </div>

            <!-- Password Mới -->
            <div class="password-container">
              <input
                v-model="passwordMoi"
                :type="showPasswordMoi ? 'text' : 'password'"
                placeholder="Password mới"
                class="form-control"
                required
                name="passwordMoi"
                id="passwordMoi"
              />
              <i
                v-if="passwordCu.length > 0"
                class="fa"
                :class="showPasswordMoi ? 'fa-eye-slash' : 'fa-eye'"
                @click="togglePassword('moi')"
              ></i>
            </div>

            <!-- Nhập lại Password -->
            <div class="password-container">
              <input
                v-model="passwordMoi1"
                :type="showPasswordMoi1 ? 'text' : 'password'"
                placeholder="Nhập lại Password"
                class="form-control"
                required
              />
              <i
                v-if="passwordCu.length > 0"
                class="fa"
                :class="showPasswordMoi1 ? 'fa-eye-slash' : 'fa-eye'"
                @click="togglePassword('moi1')"
              ></i>
            </div>
            <button type="submit" class="btn btn-lg btn-info btn-block">
              <i class="fa fa-share"></i>
              Lưu
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "changePassword",
  data() {
    return {
      passwordCu: "",
      passwordMoi: "",
      passwordMoi1: "",
      showPasswordCu: false,
      showPasswordMoi: false,
      showPasswordMoi1: false,
    };
  },
  computed: {},
  methods: {
    togglePassword(type) {
      if (type === "cu") {
        this.showPasswordCu = !this.showPasswordCu;
      } else if (type === "moi") {
        this.showPasswordMoi = !this.showPasswordMoi;
      } else if (type === "moi1") {
        this.showPasswordMoi1 = !this.showPasswordMoi1;
      }
    },

    ...mapActions(["changePassword"]),
    handleSubmitChangePW(e) {
      if (this.passwordCu === this.passwordMoi) {
        alert("Mật khẩu mới phải khác mật khẩu cũ");
        return;
      }

      // Kiểm tra mật khẩu mới có khớp nhau
      if (this.passwordMoi === this.passwordMoi1) {
        let data = {
          passwordCu: this.passwordCu,
          passwordMoi: this.passwordMoi,
          passwordMoi1: this.passwordMoi1,
        };
        this.changePassword(data).then((res) => {
          console.log(res);
          if (!res.ok) {
            if (typeof res.error === "string") {
              alert(res.error);
            } else {
              alert(res.error);
            }
          } else {
            alert("Đổi mật khẩu thành công");
            // Reset form sau khi đổi thành công
            this.passwordCu = "";
            this.passwordMoi = "";
            this.passwordMoi1 = "";
          }
        });
      } else {
        alert("Mật khẩu không khớp");
      }
    },
  },
};
</script>

<style scoped>
.ass1-login {
  max-width: 432px;
  margin: 100px auto 100px;
  text-align: center;
}

.ass1-login__content {
  padding: 36px 30px;
  background-color: #ffffff;
  border-radius: 6px;
  -webkit-box-shadow: 2px 2px 6px -2px rgba(0, 0, 0, 0.336);
  box-shadow: 0px 2px 6px -2px rgba(0, 0, 0, 0.1);
}
.ass1-login__form {
  margin: 36px 0 36px 0;
}
.ass1-login__form form input,
.ass1-login__form form > *:not(div) {
  background-color: #f6f9fb;
  border-radius: 6px;
}
.ass1-login__send {
  padding: 15px;
}

.nav-pills > li.active > a,
.nav-pills > li.active > a:hover,
.nav-pills > li.active > a:focus {
  color: #fff;
  background-color: #5bc0de;
}

.prj-name {
  font-weight: bold;
  text-shadow: 0 2px 2px #eee;
  color: #5bc0de;
}

.header,
.marketing,
.footer {
  padding-right: 15px;
  padding-left: 15px;
}

.header {
  border-bottom: 1px solid #e5e5e5;
}

.header h3 {
  padding-bottom: 19px;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 40px;
}

.footer {
  padding-top: 19px;
  color: #777;
  border-top: 1px solid #e5e5e5;
}

@media (min-width: 768px) {
  .container {
    max-width: 730px;
  }
}
.container-narrow > hr {
  margin: 30px 0;
}

.jumbotron {
  text-align: center;
  padding: 0px !important;
}

.marketing {
  margin: 40px 0;
}
.marketing p + h4 {
  margin-top: 28px;
}

@media screen and (min-width: 768px) {
  .header,
  .marketing,
  .footer {
    padding-right: 0;
    padding-left: 0;
  }

  .header {
    margin-bottom: 30px;
  }

  .jumbotron {
    border-bottom: 0;
  }
}

.btn {
  outline: 0;
  border: none;
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: none;
  box-shadow: inset 2px -3px rgba(0, 0, 0, 0.15);
}
.btn:focus {
  outline: 0;
  -webkit-outline: 0;
  -moz-outline: 0;
}
.form-signin {
  max-width: 280px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin {
  margin-bottom: 10px;
}
.form-signin .form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin #passwordCu {
  margin-bottom: -1px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: none;
  border-left-style: solid;
  border-color: #000;
}
.form-signin #passwordMoi {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: none;
  border-left-style: solid;
  /* border-color: #000; */
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top-style: none;
  border-right-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;
  border-color: rgb(0, 0, 0);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}
.form-signin-heading {
  text-align: center;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  color: #5bc0de !important;
}

.password-container {
  position: relative;
  display: flex;
  align-items: center;
}

.password-container input {
  width: 100%;
  padding-right: 40px;
}

.password-container i {
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #888;
}
</style>