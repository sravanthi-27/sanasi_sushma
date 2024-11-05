import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import axios, { Axios } from 'axios';
import { FormsModule } from '@angular/forms';
interface User {
  username: string;
  fullName: string;
  phone: string;
  email: string;
  password?: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  editUser: any = null;

  ngOnInit() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const response = await axios.get('http://localhost:5300/api/users');
      this.users = response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  editUserDetails(user: User) {
    this.editUser = { ...user };
  }

  async saveUser() {
    if (this.editUser) {
      try {
        await axios.put(`http://localhost:5300/api/users/${this.editUser.username}`, this.editUser);
        this.fetchUsers();
        this.editUser = null;
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  }

  cancelEdit() {
    this.editUser = null;
  }

  async deleteUser(username: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5300/api/users/${username}`);
        this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }
}
