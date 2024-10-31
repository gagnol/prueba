'use client';

import { useState, useTransition } from 'react';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { submitLike } from '@/lib/user-action'; 
import { toast } from 'react-hot-toast'; 

interface LikeButtonProps {
  order: {
    _id: string;
    likes: { user: string }[];
  };
}

const LikeButton: React.FC<LikeButtonProps> = ({ order }) => {
  const [isLiked, setIsLiked] = useState<boolean>(
    order.likes.some((like) => like.user === 'current_user_email') // Replace with the appropriate logic for the authenticated user
  );

  const [likeCount, setLikeCount] = useState(order.likes.length);
  const [isPending, startTransition] = useTransition();

 const handleLike = async () => {
  const formData = new FormData();
  formData.append('_id', order._id);

  startTransition(async () => {
    const result = await submitLike(null, formData);

    if (result?.message) {
      toast.success(result.message);

      // Optimistically update the like state
      const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
      setLikeCount(newLikeCount);
      setIsLiked(!isLiked);
    } else {
      toast.error('Error al votar');
    }
  });
};

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        className={`p-2 rounded-full transition ${
          isLiked ? 'text-red-500' : 'text-gray-400'
        } hover:text-red-400`}
        disabled={isPending}
      >
        <Heart fill={isLiked ? 'currentColor' : 'none'} />
      </button>
      <Badge variant="outline">{likeCount} Me gusta</Badge>
    </div>
  );
};

export default LikeButton;
