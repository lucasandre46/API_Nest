import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService implements OnModuleInit {
    private readonly logger = new Logger(FirebaseService.name);
    private firebaseApp: admin.app.App;

    async onModuleInit() {
        if (admin.apps.length === 0) {
            try {
                const serviceAccount = require(
                    path.resolve(process.cwd(), 'betobd-f71c9-firebase-adminsdk-fbsvc-b42b541caf.json')
                );

                this.firebaseApp = admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                });

                this.logger.log('Firebase initialized successfully 🔥');
            } catch (error) {
                this.logger.error('Error initializing Firebase:', error);
            }
        }
    }

    // Usando getters para facilitar o acesso
    get auth() {
        return admin.auth();
    }

    get firestore() {
        return admin.firestore();
    }
}