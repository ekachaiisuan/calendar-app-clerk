'use client';
import { eventFormSchema } from '@/schema/events';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

interface EventFormProps {
  event?: {
    id: string;
    name: string;
    description: string;
    durationInMinutes: number;
    isActive: boolean;
  };
}
export default function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const [isDeletePending, setIsDeletePending] = useState(false);

  const form = useForm<z.input<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event
      ? {
          ...event,
        }
      : {
          name: '',
          description: '',
          durationInMinutes: 30,
          isActive: true,
        },
  });

  
}
