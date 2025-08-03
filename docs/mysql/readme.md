# mysql

## 创建用户

```sql
CREATE USER 'your_user'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON *.* TO 'your_password'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

- 'your_user' 替换为您的用户名
- 'your_password' 替换为您的密码
- '%' 表示允许从任何主机连接
