import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    // Tab handling state: 'orders' | 'info' | 'addresses'
    activeTab: string = 'info';

    // --- Profile Information (Replace with your actual API Data) ---
    pharmacyName: string = 'Pharmacy Name';
    pharmacyOwnerName: string = 'Owner Name';
    whatsappNumber: string = '01234567890';
    landlineNumber: string = '-';
    email: string = 'email@example.com';
    pharmacyType: string = 'Individual';
    mobileNumber: string = '01234567890';

    // --- Orders Dashboard (Replace with your actual API Data) ---
    totalSalesValue: number = 0;
    numberOfOrders: number = 0;
    averageOrderValue: number = 0;

    // --- Address Book (Replace with your actual API Data) ---
    savedAddresses: any[] = [
        // Example address object:
        // { title: 'Home', details: '11 Street, City, Governorate', name: 'Name', phone: '01234567890' }
    ];

    setActiveTab(tab: string) {
        this.activeTab = tab;
    }
}
