import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';

const BlogItem = ({ id, image, category, description, title, date }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border-border/60">
      <Link href={`/blogs/${id}`} className="block relative aspect-video w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>
      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground hover:bg-secondary/70">
            {category}
          </Badge>
          {date && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar size={12} className="mr-1" />
              {new Date(date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          )}
        </div>
        <Link href={`/blogs/${id}`}>
          <h3 className="font-bold text-xl leading-tight hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <div
          className="text-muted-foreground text-sm line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/blogs/${id}`} className="w-full">
          <Button variant="ghost" className="w-full justify-between hover:bg-transparent hover:text-primary p-0 h-auto">
            Read More <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default BlogItem
