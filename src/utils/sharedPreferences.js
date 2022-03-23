import SharedPreferences from 'react-native-shared-preferences';

export async function saveUserData(data){
    await SharedPreferences.getItem("user", function(value){
        let profile = {...JSON.parse(value), ...data};
        SharedPreferences.setItem("user", JSON.stringify(profile));
    })
}

export function getUser(){
    return new Promise((resolve, reject) => {
        return SharedPreferences.getItem("user", function(value){
            if(value != null)
                resolve(JSON.parse(value))
            else
                reject(null)
        })
    })
}

export function clearData(){
    SharedPreferences.clear();
}