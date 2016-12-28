<template>
	<div>
	    <headerbar></headerbar>
	    <div class="login-box">
	    	<h4>{{title}}</h4>
	    	<div class="login-input">
	    		<input type="email" name="email" v-model="email">
	    		<label v-bind:class="{hasvalue: email !== ''}" for="email">{{placeholder.email}}</label>	
	    		<i class="glyphicon glyphicon-envelope"></i>
	    	</div>
	    	<div class="login-input">
	    		<input type="text" name="username" v-model="username">
	    		<label v-bind:class="{hasvalue: username !== ''}" for="username">{{placeholder.username}}</label>	
	    		<i class="glyphicon glyphicon-user"></i>
	    	</div>
	    	<div class="login-input">
	    		<input type="password" name="password" v-model="password">
    			<label v-bind:class="{hasvalue: password !== ''}" for="password">{{placeholder.password}}</label>
	    		<i class="glyphicon glyphicon-lock"></i>
	    	</div>
	    	<div class="login-input">
	    		<input type="password" name="passwordRepeat" v-model="passwordRepeat">
    			<label v-bind:class="{hasvalue: passwordRepeat !== ''}" for="passwordRepeat">{{placeholder.passwordRepeat}}</label>
	    		<i class="glyphicon glyphicon-lock"></i>
	    	</div>
	    	<div class="row chcek-box">
    			<div class="col-lg-6 col-sm-6 ta-center">
	    			<label for="sexBoy" class="radio">
	    				<input id="sexBoy" type="radio" name="sex" v-model="checked" value="1">
	    				<i v-bind:class="{checked: checked==='1'}"></i>Boy
	    			</label> 
    			</div>
    			<div class="col-lg-6 col-sm-6 ta-center">
    				<label for="sexGirl" class="radio">
	    				<input id="sexGirl" type="radio" name="sex" v-model="checked" value="2">
	    				<i v-bind:class="{checked: checked==='2'}"></i>Girl
	    			</label>
    			</div>
	    	</div>
	    	<div class="submit">
		    	<button class="btn btn-success">
		    		<i class="glyphicon glyphicon-plus-sign"></i>REGISTER
		    	</button>
	    	</div>
	    </div>
	    <footerbar></footerbar>	
	</div>
</template>

<script>
import Headerbar from './Header.vue'
import Footerbar from './Footer.vue'

export default {
  name: 'register',
  data () {
    return {
      title: 'User Register',
      placeholder: {
      	email: 'login email',
      	username: 'nickname show in chat list',
      	password: 'login password',
      	passwordRepeat: 'repeat login password' 
      },
	  email: '',
	  username: '',
	  password: '',
	  passwordRepeat: '',
      checked: '1'
  	}
  },
  components: {
  	Headerbar,
  	Footerbar
  }
}
</script>

<!-- add "scoped" this style just work in this component-->
<style scoped>
	label{
		font-weight: 400;
	}
	.chcek-box {
		margin: 3rem auto;
		width: 50%;
	}
	.radio {
		cursor: pointer;
	}
	.radio input {
		visibility: hidden;
		cursor: pointer;
	}
	.radio i{
		display: inline-block;
		margin-right: .5rem;
		width: 1.5rem;
		height: 1.5rem;
		border: .2rem solid #fff;
		border-radius: 50%;
		background-color: #fff;
		box-shadow: 0rem 0rem 0rem .2rem #000;
	}
	.checked {
		background-color: green!important;
	}
	.submit {
		width: 50%;
		margin: 2rem  auto;
		text-align: center;
	}
	.submit button {
		border-radius: .2rem;
		width: 15rem;
		margin: 1rem auto;
		height: 4rem;
		box-shadow: 0 .2rem .2rem #858585;
		font-size: 1.8rem
	}
	.submit i{
		margin-right: 1rem;
		font-size: 1.6rem;
	}
</style>
