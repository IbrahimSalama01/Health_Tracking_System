export interface sidenavItem {
  name: string;
  icon: string;
  route: string;
}
export interface user {
  _id: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  email: string;
  emailVerified: boolean;
  phone: string[]; // Array of phone numbers
  phoneVerified: boolean;
  profileImage: string;
  role: "patient" | "admin" | "doctor" ;
  currentlyActive: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  mailVerificationTokenExpires: string; // ISO timestamp
  __v: number;
}


/*************** User interfaces **************/
export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
}

type UserRole =
  | 'patient'
  | 'doctor'
  | 'lab_staff'
  | 'pharmacy_staff'
  | 'admin'
  | 'guest';
type VerificationStatus = 'active' | 'blocked' | 'binding';
type Gender = 'male' | 'female' | 'other';
type UserStatus = 'pending' | 'active' | 'suspended';

export interface User {
  _id: string;
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
  profileImage: string;
  isVerified: VerificationStatus;
  isActive: boolean;
  verificationToken: string;
  createdAt: Date;
  updatedAt: Date;
  dateOfBirth: Date;
  gender: Gender;
  status: UserStatus;
}

/*************** Patient interfaces **************/
export interface Certification {
  certificateName: string;
  date: Date;
}

export interface Doctor {
    id:string
    specialization: string;
    clinicAddress: string;
    bio: string;
    experience: number;
    user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImage: string;
    }
}

/****************** Checkups *****************/
export interface Checkup {
  _id?: string;
  createdBy: string; // User ID
  threadId: string; // Thread ID
  doctorId: string; // Doctor ID
  patientId: string; // Patient ID
  type?: 'checkup' | 'follow-up';
  specialization: string;
  checkupDate: Date;
  symptoms?: string[];
  doctorSigns?: string[];
  diagnosis?: string;
  prescription?: string; // Prescription ID
  doctorRecommendations?: string;
  followup?: {
    needed?: boolean;
    checkupId?: string; // Checkup ID
    date?: Date;
    attended?: boolean;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

/******************** prescription ******************/
export interface Treatment {
  name: string;
  concentration: string;
  dose: string;
  frequency: string; // how many times a day
  duration: string; // how long
  notes?: string;
}

export interface Prescription {
  _id?: string; // MongoDB ObjectId as string
  createdBy: string; // User ID
  doctorId: string;
  patientId: string;
  date?: Date;
  treatments: Treatment[];
  createdAt?: Date;
  updatedAt?: Date;
}

/************************* Thread *****************/
export interface Thread {
  _id?: string; // MongoDB ObjectId as string
  createdBy: string; // User ID
  name: string;
}
