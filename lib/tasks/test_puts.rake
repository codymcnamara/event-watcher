desc 'say hello world to console'

task hello_world: :environment do
  puts 'hello world from the rake task'
end
