<template>
  <div class="register">
    <div class="box">
      <i class="el-icon-close" @click="close_register"></i>
      <div class="content">
        <div class="nav">
          <span class="active">Sign Up</span>
        </div>
        <el-form>
          <el-input
              placeholder="Email"
              prefix-icon="el-icon-phone-outline"
              v-model="email"
              clearable
              @blur="check_email">
          </el-input>
          <el-input
              placeholder="密码"
              prefix-icon="el-icon-key"
              v-model="password"
              clearable
              show-password>
          </el-input>
          <el-input
              placeholder="验证码"
              prefix-icon="el-icon-chat-line-round"
              v-model="sms"
              clearable>
            <template slot="append">
              <span class="sms" @click="send_sms">{{ sms_interval }}</span>
            </template>
          </el-input>
          <el-button type="primary" @click="signup">注册</el-button>
        </el-form>
        <div class="foot">
          <span @click="go_login">立即登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: '',
      password: '',
      sms: '',
      sms_interval: '获取验证码',
      is_send: false,
    }
  },
  methods: {
    close_register() {
      this.$emit('close', false)
    },
    go_login() {
      this.$emit('go')
    },
    check_email() {
      if (!this.email) return;
      if (!this.email.match(/^.+@.+$/)) {
        this.$message({
          message: 'Wrong Email format.',
          type: 'warning',
          duration: 1000,
          onClose: () => {
            this.email = '';
          }
        });
        return false;
      }
      this.$axios.get(this.$settings.base_url + '/user/check_email/',
          {params: {'email': this.email}}).then(response => {
        if (response.data.code) {
          console.log(response.data.code)
          this.$message({
            message: 'You have already signed up for our website.',
            type: 'warning',
            duration: 1500,
            onClose: () => {
              this.go_login()
            }
          })
        } else {
          this.is_send = true;
          this.$message({
            message: 'The email is validated,WELCOME!',
            type: 'success',
            duration: 1500
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    send_sms() {
      if (!this.is_send) return;
      this.is_send = false;
      let sms_interval_time = 60;
      this.sms_interval = "Sending...";
      this.$axios.get(this.$settings.base_url + '/user/send_email/',
          {params: {'email': this.email}}).then(response => {
        if (response.data.code) {
          this.$message({
            message: 'Sent!',
            type: 'success',
            duration: 1000,

          });
        }}
      )
      let timer = setInterval(() => {
        if (sms_interval_time <= 1) {
          clearInterval(timer);
          this.sms_interval = "获取验证码";
          this.is_send = true; // 重新回复点击发送功能的条件
        } else {
          sms_interval_time -= 1;
          this.sms_interval = `${sms_interval_time}秒后再发`;
        }
      }, 1000);
    },
    signup() {
      if (this.email && this.sms && this.password) {
        this.$axios.post(this.$settings.base_url + '/user/signup/', {
          email: this.email,
          password: this.password,
          code: this.sms
        }).then(response => {

          if (response.data.code) {
            this.$message({
              message: 'WELCOME!',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.go_login()
              }
            });
          } else {
            this.$message({
              message: 'Invalid form.',
              duration: 1500,
              type: 'warning',
              onClose: () => {
                this.email = ''
                this.password = ''
                this.sms = ''
              }
            })
          }
        })
      } else {
        this.$message({
          message: 'The form has invalid information.',
          type: 'error',
          duration: 1000,
        });
      }
    }
  }
}
</script>

<style scoped>
.register {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
}

.box {
  width: 400px;
  height: 480px;
  background-color: white;
  border-radius: 10px;
  position: relative;
  top: calc(50vh - 240px);
  left: calc(50vw - 200px);
}

.el-icon-close {
  position: absolute;
  font-weight: bold;
  font-size: 20px;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.el-icon-close:hover {
  color: darkred;
}

.content {
  position: absolute;
  top: 40px;
  width: 280px;
  left: 60px;
}

.nav {
  font-size: 20px;
  height: 38px;
  border-bottom: 2px solid darkgrey;
}

.nav > span {
  margin-left: 90px;
  color: darkgrey;
  user-select: none;
  cursor: pointer;
  padding-bottom: 10px;
  border-bottom: 2px solid darkgrey;
}

.nav > span.active {
  color: black;
  border-bottom: 3px solid black;
  padding-bottom: 9px;
}

.el-input, .el-button {
  margin-top: 40px;
}

.el-button {
  width: 100%;
  font-size: 18px;
}

.foot > span {
  float: right;
  margin-top: 20px;
  color: orange;
  cursor: pointer;
}

.sms {
  color: orange;
  cursor: pointer;
  display: inline-block;
  width: 70px;
  text-align: center;
  user-select: none;
}
</style>