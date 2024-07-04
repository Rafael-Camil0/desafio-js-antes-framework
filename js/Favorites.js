import { GithubApi } from "./GitHubApi.js";

export class Favorites {

    constructor(root){
        this.root = document.querySelector(root)
        this.load()
      
    }

        load(){
            this.entries =JSON.parse(localStorage.getItem('gitHubUser') ) || []
        }
        save(){
            localStorage.setItem('gitHubUser',JSON.stringify(this.entries)) 
        }
        async addUser(username){
            
            try{
              
                const isExist = this.entries.find((user) => user.login.toLowerCase() == username.toLowerCase())
                if(isExist != undefined){
                   
                    throw new Error('Usuário já cadastrado')
                }
        
                const user = await GithubApi.search(username)
        
        
                if(user.login == undefined){
                    throw new Error('Usuário não encontrado ')
                }
        
                this.entries = [user, ...this.entries]
                this.save()
                this.updateView()
            }catch(e){
                alert(e)
            }
           
           
    
    
            
    
    
        }
        removefavorite(username){
            const entriesFilter = this.entries.filter(user => user.login != username)
    
            this.entries = entriesFilter;
            this.save()
            
            this.updateView()
    
    
        }
}

export class FavoriteView extends Favorites {   

    constructor(root){
        super(root)
        this.tbody = this.root.querySelector('table tbody')
        this.updateView()
        this.onAdd()
        
    }
    

  

    createTr(user){
        const tr = document.createElement('tr')
   
        
        tr.innerHTML =` <tr>
                    <td class="user">
                        <img src="https://github.com/${user.login}.png" alt="Imagem de ${user.name}">
                        <div>
                            <p>${user.name}</p>
                            <span>${user.login}</span>
                        </div>
                            
                    </td>
                    <td>${user.public_repos}</td>
                    <td>${user.followers}</td>
                    <td><button class="remover">Remover</button></td>
                </tr>`

              
                return tr; 

    }   
  

    updateView(){
        this.removeAllTr()

        this.entries.forEach(user =>  {
            const row = this.createTr(user)

            row.querySelector('.remover').onclick = () => {
                this.removefavorite(user.login)
                
            }

            this.tbody.append(row)
        }) 
        this.load()

    }
   

    removeAllTr(){

        this.tbody.querySelectorAll('tr')
        .forEach(
            tr => {tr.remove()}
        )

         
    }

    onAdd(){
       

        this.root.querySelector('nav button').onclick = () => {
            const {value} = this.root.querySelector('nav input')
            this.addUser(value)

        }
    }

    

}