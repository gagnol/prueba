'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Facebook,Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';
import Image from 'next/image';

interface SocialShareProps {
  url: string;
  title: string;
  shareCount: number;
}

const SocialShare: React.FC<SocialShareProps> = () => {
  
  return (
    <div className="flex flex-wrap items-center gap-4">
        <p>Compartí</p>
      {/* Facebook */}
      <FacebookShareButton
        url="https://fashion-2024.vercel.app/profile/crear/671ba93be48cecb9f4603628"
        title="Comunicado de prensa"
          >
        <Button variant="outline">
          <Facebook className="w-5 h-5" />
        </Button>
      </FacebookShareButton>

      {/* Twitter */}
      <TwitterShareButton
        url="https://fashion-2024.vercel.app/profile/crear/671ba93be48cecb9f4603628"
        title="Comunicado de prensa"
        
      >
        <Button variant="outline">
        <Image alt="x" src="/x.svg" width={20} height={20} 
         className="w-5 h-5" />
        </Button>
      </TwitterShareButton>

      {/* LinkedIn */}
      <LinkedinShareButton
        url="https://fashion-2024.vercel.app/profile/crear/671ba93be48cecb9f4603628"
        title="Comunicado de prensa"
      >
        <Button variant="outline">
          <Linkedin className="w-5 h-5 " />
        </Button>
      </LinkedinShareButton>

      {/* WhatsApp */}
      <WhatsappShareButton
        url="https://fashion-2024.vercel.app/profile/crear/671ba93be48cecb9f4603628"
        title="Comunicado de prensa"
        separator=" - "
        
      >
        <Button variant="outline">
          <Image alt="whatsapp" src="/whatsapp.svg" width={20} height={20} 
          className="w-5 h-5" />
        </Button>
      </WhatsappShareButton>
      
    </div>
  );
};

export default SocialShare;
