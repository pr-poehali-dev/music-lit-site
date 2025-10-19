import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Track {
  id: number;
  title: string;
  duration: string;
  file?: string;
}

interface Book {
  id: number;
  title: string;
  type: 'book' | 'page' | 'draft';
  description: string;
  cover?: string;
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

const Index = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('hero');
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  
  const [tracks] = useState<Track[]>([
    { id: 1, title: 'Мелодия души', duration: '3:45' },
    { id: 2, title: 'Ночной город', duration: '4:12' },
    { id: 3, title: 'Шёпот ветра', duration: '3:28' },
  ]);

  const [books] = useState<Book[]>([
    { id: 1, title: 'Путь к свету', type: 'book', description: 'Философский роман о поиске смысла' },
    { id: 2, title: 'Тихие страницы', type: 'book', description: 'Сборник лирических стихотворений' },
    { id: 3, title: 'Черновик: Новая глава', type: 'draft', description: 'Работа над новым произведением' },
  ]);

  const [blogPosts] = useState<BlogPost[]>([
    { id: 1, title: 'Новый альбом в работе', date: '15 октября 2025', excerpt: 'Начал запись нового музыкального альбома с экспериментальным звучанием...' },
    { id: 2, title: 'Презентация книги', date: '8 октября 2025', excerpt: 'Рад анонсировать презентацию моего нового романа в местной библиотеке...' },
    { id: 3, title: 'Творческие размышления', date: '1 октября 2025', excerpt: 'Сегодня хочу поделиться своими мыслями о связи музыки и литературы...' },
  ]);

  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: 'Александр', text: 'Невероятная музыка! Очень атмосферно', date: '12 октября' },
    { id: 2, author: 'Мария', text: 'Ваша книга тронула до глубины души', date: '10 октября' },
  ]);

  const [newComment, setNewComment] = useState({ author: '', text: '' });

  const playTrack = (id: number) => {
    setCurrentTrack(id);
    toast({
      title: 'Воспроизведение',
      description: `Играет: ${tracks.find(t => t.id === id)?.title}`,
    });
  };

  const downloadTrack = (track: Track) => {
    toast({
      title: 'Скачивание',
      description: `Скачивание трека: ${track.title}`,
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.author && newComment.text) {
      setComments([...comments, {
        id: comments.length + 1,
        author: newComment.author,
        text: newComment.text,
        date: 'только что'
      }]);
      setNewComment({ author: '', text: '' });
      toast({
        title: 'Комментарий добавлен',
        description: 'Спасибо за ваш отзыв!',
      });
    }
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Творческое Пространство
            </h1>
            <div className="flex gap-6">
              {['music', 'books', 'blog', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-muted-foreground hover:text-primary transition-colors capitalize"
                >
                  {section === 'music' && 'Музыка'}
                  {section === 'books' && 'Книги'}
                  {section === 'blog' && 'Блог'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://cdn.poehali.dev/projects/2c7e3b7d-7cbc-4fd3-8281-ef9deec4ee22/files/7bc288e4-3ebc-49a3-b5cf-372f67532af0.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Искусство в звуке и слове
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Добро пожаловать в мир музыкальных композиций и литературных произведений
          </p>
          <Button 
            size="lg" 
            onClick={() => scrollToSection('music')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Начать путешествие
            <Icon name="ArrowDown" className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      <section id="music" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="animate-slide-in-left">
            <h2 className="text-5xl font-bold mb-4 text-center">Музыкальный путь</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Каждая композиция - это история, рассказанная через звуки
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-card/50 backdrop-blur border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="text-3xl">О моей музыке</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://cdn.poehali.dev/projects/2c7e3b7d-7cbc-4fd3-8281-ef9deec4ee22/files/72aba286-e85c-4df5-8add-99fb39e4f28a.jpg"
                  alt="Music"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-muted-foreground leading-relaxed">
                  Моя музыка сочетает классические мелодии с современными аранжировками. 
                  Я создаю атмосферные композиции, которые погружают слушателя в мир эмоций 
                  и воспоминаний. Каждый трек - это путешествие через звуковые ландшафты.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-4">Мои композиции</h3>
              {tracks.map((track) => (
                <Card key={track.id} className="bg-card/50 backdrop-blur border-border hover:border-primary transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          size="icon"
                          variant={currentTrack === track.id ? "default" : "outline"}
                          onClick={() => playTrack(track.id)}
                        >
                          <Icon name={currentTrack === track.id ? "Pause" : "Play"} size={20} />
                        </Button>
                        <div>
                          <h4 className="font-semibold">{track.title}</h4>
                          <p className="text-sm text-muted-foreground">{track.duration}</p>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => downloadTrack(track)}
                      >
                        <Icon name="Download" size={20} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card className="bg-primary/10 border-primary/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Upload" size={24} className="text-primary" />
                    <div>
                      <p className="font-semibold">Загрузить новый трек</p>
                      <p className="text-sm text-muted-foreground">Поделитесь своей музыкой</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      <section id="books" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="animate-slide-in-left">
            <h2 className="text-5xl font-bold mb-4 text-center">Литературное творчество</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Слова, которые рождают миры и пробуждают воображение
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img 
                src="https://cdn.poehali.dev/projects/2c7e3b7d-7cbc-4fd3-8281-ef9deec4ee22/files/07961f2e-d473-4ed2-9d45-67acdec56c31.jpg"
                alt="Books"
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
              <Card className="bg-card/50 backdrop-blur border-border">
                <CardHeader>
                  <CardTitle>О моих произведениях</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    В моих книгах я исследую глубины человеческой души, переплетая философские 
                    размышления с лирическими образами. Каждая страница - это приглашение к 
                    диалогу с собой и миром вокруг.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="books">Книги</TabsTrigger>
                  <TabsTrigger value="drafts">Черновики</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  {books.map((book) => (
                    <Card key={book.id} className="bg-card/50 backdrop-blur border-border hover:border-primary transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{book.title}</CardTitle>
                            <CardDescription>{book.description}</CardDescription>
                          </div>
                          <Badge variant={book.type === 'draft' ? 'secondary' : 'default'}>
                            {book.type === 'book' && 'Книга'}
                            {book.type === 'page' && 'Страница'}
                            {book.type === 'draft' && 'Черновик'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Icon name="Eye" size={16} className="mr-2" />
                            Читать
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="Download" size={16} className="mr-2" />
                            Скачать
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="books" className="space-y-4">
                  {books.filter(b => b.type === 'book').map((book) => (
                    <Card key={book.id} className="bg-card/50 backdrop-blur border-border">
                      <CardHeader>
                        <CardTitle>{book.title}</CardTitle>
                        <CardDescription>{book.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="drafts" className="space-y-4">
                  {books.filter(b => b.type === 'draft').map((book) => (
                    <Card key={book.id} className="bg-card/50 backdrop-blur border-border">
                      <CardHeader>
                        <CardTitle>{book.title}</CardTitle>
                        <CardDescription>{book.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
              <Card className="bg-primary/10 border-primary/50 mt-4">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Upload" size={24} className="text-primary" />
                    <div>
                      <p className="font-semibold">Загрузить новое произведение</p>
                      <p className="text-sm text-muted-foreground">Книга, страница или черновик</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      <section id="blog" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-slide-in-left">
            <h2 className="text-5xl font-bold mb-4 text-center">Блог</h2>
            <p className="text-center text-muted-foreground mb-12">
              Новости, размышления и анонсы
            </p>
          </div>

          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="bg-card/50 backdrop-blur border-border hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Icon name="Calendar" size={14} />
                        {post.date}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button variant="link" className="p-0">
                    Читать полностью
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl font-bold mb-8 text-center">Комментарии</h3>
          
          <div className="space-y-4 mb-8">
            {comments.map((comment) => (
              <Card key={comment.id} className="bg-card/50 backdrop-blur border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={16} className="text-primary" />
                      <span className="font-semibold">{comment.author}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="text-muted-foreground">{comment.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Оставить комментарий</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Ваше имя"
                    value={newComment.author}
                    onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Ваш комментарий"
                    value={newComment.text}
                    onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="animate-slide-in-left">
            <h2 className="text-5xl font-bold mb-4 text-center">Контакты</h2>
            <p className="text-center text-muted-foreground mb-12">
              Свяжитесь со мной для сотрудничества или вопросов
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur border-border">
            <CardContent className="p-8">
              <div className="grid gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">creative@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Телефон</p>
                    <p className="text-muted-foreground">+7 (XXX) XXX-XX-XX</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="MessageCircle" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Социальные сети</p>
                    <div className="flex gap-3 mt-2">
                      <Button size="icon" variant="outline">
                        <Icon name="Facebook" size={20} />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Icon name="Instagram" size={20} />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Icon name="Twitter" size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 Творческое Пространство. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
