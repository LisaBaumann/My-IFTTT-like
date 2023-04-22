mongosh -- "area" <<EOF
    let rootUser = 'yboussadia'
    let rootPass = 'jadeamr'
    let admin = db.getSiblingDB('admin')
    admin.auth(rootUser, rootPass)
    let user = 'yamroun'
    let pwd = 'jadeamr'
    db.createUser({
        user,
        pwd,
        roles: ['readWrite']
    })
EOF