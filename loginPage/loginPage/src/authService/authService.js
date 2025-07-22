import conf from "../conf";

class AuthService{
    
     async login(values){
        console.log(conf.base_url+'/api/auth/login');
        try{
        const res= await fetch(conf.base_url+'/api/auth/login',{
            mode:'cors',
            method:'POST',
            headers: {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(values)
          })
          const data = await res.json();
          localStorage.setItem('name',data.user.name);
          localStorage.setItem('email',data.user.email);
        //   dispatch(login(data.user))
          console.log(data);
          // Handle the response data
          return data;
    }catch(e){
        throw e
    }
    }

    async signup(values){
        try {
            const res=await fetch(conf.base_url+'/api/auth/signup',{
                mode:'cors',
                method:'POST',
                headers: {
                  'Access-Control-Allow-Origin':'*',
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify(values)
            })
            const data=await res.json();
            return data;
        } catch (e) {
            throw e;
        }
    }
}

const authService=new AuthService();

export default authService;