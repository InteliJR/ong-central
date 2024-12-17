import React, { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../shadcnui/dropdown-menu";
import { Button } from "../shadcnui/button";
import { Bell, X } from "lucide-react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "../shadcnui/alert-dialog";

// Type definition for a subscription
interface Subscription {
  id: string;
  type: 'monthly' | 'single';
  amount: number;
  startDate: Date;
}

const NotificationsDropdown: React.FC = () => {
  // Mock data - in a real app, this would come from state management or API
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { 
      id: '1', 
      type: 'monthly', 
      amount: 50, 
      startDate: new Date('2024-01-15') 
    },
    { 
      id: '2', 
      type: 'single', 
      amount: 100, 
      startDate: new Date('2024-02-20') 
    }
  ]);

  // State to manage which subscription is being cancelled
  const [cancellingSubscription, setCancellingSubscription] = useState<string | null>(null);

  // Function to initiate subscription cancellation
  const startCancellation = (subscriptionId: string) => {
    setCancellingSubscription(subscriptionId);
  };

  // Function to confirm subscription cancellation
  const confirmCancelSubscription = () => {
    if (cancellingSubscription) {
      setSubscriptions(current => 
        current.filter(subscription => subscription.id !== cancellingSubscription)
      );
      setCancellingSubscription(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {subscriptions.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">
              {subscriptions.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          Suas Assinaturas 
          <span className="text-sm text-muted-foreground">
            {subscriptions.length} ativas
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {subscriptions.length === 0 ? (
          <DropdownMenuItem disabled>
            Nenhuma assinatura ativa
          </DropdownMenuItem>
        ) : (
          subscriptions.map(subscription => (
            <DropdownMenuItem key={subscription.id} className="flex justify-between items-center">
              <div>
                <div>
                  {subscription.type === 'monthly' ? 'Assinatura Mensal' : 'Doação Única'}
                </div>
                <div className="text-sm text-muted-foreground">
                  R$ {subscription.amount.toFixed(2)} 
                  {' - '}
                  {subscription.startDate.toLocaleDateString()}
                </div>
              </div>
              
              <AlertDialog open={cancellingSubscription === subscription.id}>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => startCancellation(subscription.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar Assinatura</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja cancelar esta assinatura? 
                      Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setCancellingSubscription(null)}>
                      Manter
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={confirmCancelSubscription}
                    >
                      Cancelar Assinatura
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;