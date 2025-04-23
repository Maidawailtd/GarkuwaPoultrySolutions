import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useProjectStore, useCategoryStore } from '@/lib/store';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Search,
  Tag,
  Filter,
} from 'lucide-react';
import { format } from 'date-fns';

export default function Projects() {
  const { projects, isLoading, fetchProjects, searchProjects } = useProjectStore();
  const { categories, fetchCategories } = useCategoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [budgetRange, setBudgetRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, [fetchProjects, fetchCategories]);

  const handleSearch = () => {
    searchProjects(
      searchTerm,
      categoryId ? parseInt(categoryId) : undefined,
      budgetRange[0] > 0 ? budgetRange[0] : undefined,
      budgetRange[1] < 10000 ? budgetRange[1] : undefined
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryId('');
    setBudgetRange([0, 10000]);
    fetchProjects();
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Browse Projects</h1>
          <p className="text-muted-foreground">
            Find the perfect project that matches your skills and interests
          </p>
        </div>
        <Button onClick={() => setShowFilters(!showFilters)} variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Search and filters */}
      <Card className={`mb-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Budget Range: ${budgetRange[0]} - ${budgetRange[1]}</span>
                </div>
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={budgetRange}
                  onValueChange={setBudgetRange}
                />
              </div>
            </div>
            <div className="md:col-span-1 flex items-center justify-end">
              <div className="space-x-2">
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="link" onClick={resetFilters} className="h-auto p-0">
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Project listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6)
            .fill(null)
            .map((_, i) => (
              <Card key={i} className="border border-dashed animate-pulse">
                <CardHeader className="space-y-2">
                  <div className="h-6 w-3/4 bg-muted rounded"></div>
                  <div className="h-4 w-1/2 bg-muted rounded"></div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded"></div>
                  <div className="h-4 w-full bg-muted rounded"></div>
                  <div className="h-4 w-2/3 bg-muted rounded"></div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="h-4 w-1/3 bg-muted rounded"></div>
                  <div className="h-9 w-1/3 bg-muted rounded"></div>
                </CardFooter>
              </Card>
            ))
        ) : projects.length === 0 ? (
          <div className="col-span-full">
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                <CardTitle className="text-xl mb-2">No Projects Found</CardTitle>
                <CardDescription className="text-center">
                  We couldn't find any projects that match your search criteria. Try adjusting your filters or check back soon for new opportunities.
                </CardDescription>
                <Button className="mt-6" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="mb-1 line-clamp-1">{project.title}</CardTitle>
                    <CardDescription>
                      Posted {format(new Date(project.createdAt), 'MMM d, yyyy')}
                    </CardDescription>
                  </div>
                  <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                    {project.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm line-clamp-3 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.find(c => c.id === project.categoryId) && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Tag className="h-3 w-3 mr-1" />
                      {categories.find(c => c.id === project.categoryId)?.name}
                    </div>
                  )}
                  {project.budget && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3 mr-1" />
                      Budget: ${project.budget}
                    </div>
                  )}
                  {project.deadline && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      Due: {format(new Date(project.deadline), 'MMM d, yyyy')}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t">
                <Link href={`/projects/${project.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}